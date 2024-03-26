<template>
  <div class="page-container">
    <div class="content-container">
      <h1>Awards Committee</h1>
      <div class="button-container">
        <button class="refresh-button" @click="refreshPage">Refresh Page</button>
      </div>
      <div class="table-container">
        <label for="file-input" class="import-roster-button">Import Roster</label>
        <input id="file-input" type="file" @change="handleFileUpload" style="display: none;">
        <button class="remove-button" :class="{ 'disabled': selectedRows.length === 0 }" @click="removeSelectedRows">Remove Selected</button>
        <button class="export-button">Export to Excel</button>
        <table v-if="awardsCommitteeData.length > 0">
          <thead>
            <tr>
              <th>Select</th>
              <th>Member</th>
              <th>Role</th>
              <th>Email</th>
              <th>Term</th>
              <th>Affiliation</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in awardsCommitteeData" :key="index" :class="{ 'highlighted': isRowHighlighted(row) }">
              <td><input type="checkbox" @change="toggleSelection(index)" :checked="selectedRows.includes(index)"></td>
              <td>{{ row.Member }}</td>
              <td>{{ row.Role }}</td>
              <td>{{ row.Email }}</td>
              <td>{{ row.Term }}</td>
              <td>{{ row.Affiliation }}</td>
            </tr>
          </tbody>
        </table>
        <p v-else>No data available</p>
      </div>
    </div>
  </div>
</template>

<script>
import Papa from 'papaparse';
import eventBus from '@/eventBus/eventBus.js';

export default {
  data() {
    return {
      awardsCommitteeData: [],
      selectedRows: [],
      showAddedMemberPopup: false
    };
  },
  mounted() {
    // Listen for 'memberAdded' event from Profile page
    eventBus.on('memberAdded', this.handleMemberAdded);
    const storedData = localStorage.getItem('awardsCommitteeData');
    if (storedData) {
      this.awardsCommitteeData = JSON.parse(storedData);
    }
    
  },
  beforeUnmount() {
    // Remove the event listener when the component is unmounted
    eventBus.off('memberAdded', this.handleMemberAdded);
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          this.awardsCommitteeData = results.data;
          localStorage.setItem('awardsCommitteeData', JSON.stringify(results.data));
        }
      });
    },
    removeSelectedRows() {
      this.selectedRows.forEach(index => {
        this.awardsCommitteeData.splice(index, 1);
      });
      localStorage.setItem('awardsCommitteeData', JSON.stringify(this.awardsCommitteeData));
      this.selectedRows = [];
    },
    isRowHighlighted(row) {
      return row.Term === '2024';
    },
    toggleSelection(index) {
      if (this.selectedRows.includes(index)) {
        const selectedIndex = this.selectedRows.indexOf(index);
        this.selectedRows.splice(selectedIndex, 1);
      } else {
        this.selectedRows.push(index);
      }
    },
    refreshPage() {
  // Listen for the 'memberAdded' event
  eventBus.on('memberAdded', memberData => {
    // Add the received memberData to awardsCommitteeData
    this.awardsCommitteeData.unshift(memberData);

    // Optionally, update localStorage if needed
    localStorage.setItem('awardsCommitteeData', JSON.stringify(this.awardsCommitteeData));

    // Optionally, show a popup or perform other actions
    this.showAddedMemberPopup = true;
  });

  // Trigger the 'memberAdded' event from the Profile page if needed
  // This is just an example, replace it with your actual logic to trigger the event
  // eventBus.emit('memberAdded', memberData);
},
    handleMemberAdded(memberData) {
      this.awardsCommitteeData.unshift(memberData);
      localStorage.setItem('awardsCommitteeData', JSON.stringify(this.awardsCommitteeData));
      this.showAddedMemberPopup = true;
    }
  }
};
</script>


<style scoped>
.page-container {
  display: flex;
  justify-content: center;
}

.content-container {
  margin: 0 auto; 
  padding: 20px; 
  max-width: 800px; 
}

.table-container {
  margin-top: 20px;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f1f1f1;
}

.import-roster-button,
.export-button {
  display: inline-block;
  padding: 10px 20px;
  margin-right: 10px; /* Add margin to the right */
  margin-bottom: 10;
}

.remove-button {
  display: inline-block;
  padding: 10px 20px;
  background: #007bff;
  color: #fff;
  border: 1px solid #007bff;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
  margin-bottom: 10px;
}

.remove-button.disabled {
  background: #ccc;
  border-color: #ccc;
  cursor: not-allowed;
}

.highlighted {
  background-color: #ffff99; /* Highlighter yellow background for highlighted rows */
}

/* Styles for the popup */
.popup-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.close-button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.close-button:hover {
  background-color: #0056b3; /* Darker shade of blue on hover */
}
</style>
