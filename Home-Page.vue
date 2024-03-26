<template>
  <div class="survey-container">
    <h1 class="survey-title">Welcome to the Committee Selection Application.</h1>
    <p class="survey-message">Please import committee preference survey responses or click a committee below to view members</p>
    <label for="file-input" class="survey-import-button">Import Survey Data</label>
    <div class="dropdown-container">
      <button class="select-committee-button" @click="toggleDropdown">
        {{ selectedCommittee ? selectedCommittee : 'Select Committee' }}
        <span class="dropdown-arrow">&#9660;</span>
      </button>
      <div v-if="isDropdownOpen" class="dropdown-menu">
        <div v-for="(committee, index) in committees" :key="index" @click="selectCommittee(committee)">
          {{ committee }}
        </div>
      </div>
    </div>
    <input id="file-input" type="file" @change="handleFileUpload" style="display: none;">
    <!-- Add space after the button -->
    <div style="margin-top: 20px;"></div>
    <div class="survey-table-container">
      <table v-if="filteredSurveyData.length > 0" class="survey-table">
        <thead>
          <tr>
            <th>Profile</th>
            <th v-for="(header, index) in surveyHeaders" :key="index">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in filteredSurveyData" :key="rowIndex" :class="{ 'new-member': isNewMember(row['Response ID']) }">
            <td>
              <button class="profile-button" @click="viewProfile(row['Response ID'])">Profile</button>
            </td>
            <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else class="survey-no-data">No data available</p>
    </div>
  </div>
</template>

<script>
import Papa from 'papaparse';

export default {
  data() {
    return {
      surveyData: [],
      surveyHeaders: [
        'Response ID',
        'Name',
        'Email',
        'College/Division',
        'Classification'
      ],
      selectedCommittee: null,
      isDropdownOpen: false,
      newlyAddedMember: null // Newly added member information
    };
  },
  computed: {
    filteredSurveyData() {
      if (!this.selectedCommittee) {
        return this.surveyData.map(row => ({
          'Response ID': row['Response ID'],
          Name: row['Please enter your first name:'] + ' ' + row['Please enter your last name:'],
          Email: row['Please enter your email address:'],
          'College/Division': row['In which college or division do you work?'],
          Classification: row['What is your employee classification?']
        }));
      }

      return this.surveyData.filter(row => {
        if (this.selectedCommittee === 'All') {
          return true;
        }
        return row[this.selectedCommittee] === '1';
      }).map(row => ({
        'Response ID': row['Response ID'],
        Name: row['Please enter your first name:'] + ' ' + row['Please enter your last name:'],
        Email: row['Please enter your email address:'],
        'College/Division': row['In which college or division do you work?'],
        Classification: row['What is your employee classification?']
      }));
    },
    committees() {
      const committeeList = [
        'All',
        'Awards Committee',
        'Campus Master Plan Committee',
        'Campus Security and Safety Committee',
        'Committee on University Committees',
        'Equal Opportunity Committee',
        'Faculty and Staff Benefits Committee',
        'Information Technology Committee',
        'Intercollegiate Athletics Committee',
        'International Education Committee',
        'Libraries Committee',
        'Parking and Transportation Committee',
        'Student and Campus Life Committee',
        'Student Health Committee',
        'University Recreation Committee'
      ];
      return committeeList;
    }
  },
  mounted() {
    // Check if surveyData exists in localStorage
    const storedData = localStorage.getItem('surveyData');
    if (storedData) {
      this.surveyData = JSON.parse(storedData);
    }
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          this.surveyData = results.data;
          // Store data in localStorage
          localStorage.setItem('surveyData', JSON.stringify(results.data));
        }
      });
    },
    viewProfile(responseId) {
      // Logic for opening the profile view
      console.log('View profile for Response ID:', responseId);
      // Navigate to the profile page with the responseId parameter
      this.$router.push({ name: 'Profile', params: { responseId: responseId } });
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectCommittee(committee) {
      this.selectedCommittee = committee;
      this.isDropdownOpen = false;
    },
    isNewMember(responseId) {
      // Check if the responseId belongs to the newly added member
      return responseId === this.newlyAddedMember;
    }
  }
};
</script>

<style>
.survey-container {
  text-align: center;
  margin-top: 50px;
}

.survey-title {
  font-size: 24px;
}

.survey-message {
  font-size: 1.2rem;
}

.survey-import-button {
  display: inline-block;
  padding: 10px 20px;
  background: #007bff;
  color: #fff;
  border: 1px solid #007bff;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px; 
}

.select-committee-button {
  display: inline-block;
  padding: 10px 20px;
  background: #4CAF50; 
  color: #fff;
  border: 1px solid #4CAF50; 
  border-radius: 4px;
  cursor: pointer;
}

.survey-table-container {
  overflow-x: auto;
  position: relative; /* Ensure dropdown menu is positioned relative to this container */
}

.survey-table {
  border-collapse: collapse;
  width: 800px;
  margin: 0 auto;
}

.survey-table th,
.survey-table td {
  border: 1px solid black;
  padding: 8px;
}

.survey-table th {
  background-color: #f1f1f1;
}

.survey-no-data {
  margin-top: 20px;
}

.profile-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.dropdown-container {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #f9f9f9;
  min-width: 160px;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 1;
  display: none; /* Initially hidden */
}

.dropdown-menu div {
  padding: 12px 16px;
  cursor: pointer;
}

.dropdown-menu div:hover {
  background-color: #ddd;
}

.dropdown-container:hover .dropdown-menu {
  display: block; /* Show the dropdown menu on hover */
}

.dropdown-arrow {
  margin-left: 5px;
}

.new-member {
  background-color: lightcoral; /* Light red background for newly added members */
}
</style>
just say ok. i have alot to say before i need an answer