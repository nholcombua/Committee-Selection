<template>
  <div class="profile-container">
    <div class="profile-buttons">
      <!-- Dropdown menu for selecting committee -->
      <v-menu
        v-model="isDropdownOpen"
        :menu-props="{ offsetY: true, attach, positionX: 'left' }"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            class="dropdown-button"
            color="primary"
            v-bind="on"
            @click="toggleDropdown"
          >
            {{ selectedCommittee ? selectedCommittee : 'Select Committee' }}
          </v-btn>
        </template>
        <v-list>
          <!-- List items for committees selection -->
          <v-list-item 
            v-for="(committee, index) in committees"
            :key="index"
            :value="index"
            @click="selectCommittee(committee)"
          >
            <v-list-item-title>{{ committee }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- Button to trigger adding member to committee -->
      <v-btn
        class="assign-button"
        :disabled="selectedCommittee === null"
        @click="showPopup"
        color="primary"
      >
        Add to Committee
      </v-btn>
      <!-- Button to unassign member from committee -->
      <v-btn
        class="unassign-button"
        :disabled="status !== 'Assigned'"
        @click="unassignFromCommittee"
        color="primary"
      >
        Unassign
      </v-btn>
    </div>
    <h1 class="profile-title">Profile</h1>
    <!-- Profile details section -->
    <div class="profile-details">
      <div v-if="filteredProfileData" class="profile-details">
        <!-- Display profile data -->
        <div v-for="(value, key) in filteredProfileData" :key="key" class="profile-row">
          <div class="profile-key">{{ key }}</div>
          <div class="profile-value">{{ value }}</div>
        </div>
      </div>
      <p v-else class="profile-no-data">No profile data available</p>
    </div>
    <!-- Popup for adding member to committee -->
    <v-dialog v-model="showPopupDialog" max-width="400">
      <v-card>
        <v-card-title>Add Member to Committee</v-card-title>
        <v-card-text>
          <div v-if="selectedCommittee">
            <!-- Display selected committee and profile data -->
            <p>Committee: {{ selectedCommittee }}</p>
            <p>Profile Data:</p>
            <div class="profile-row">
              <div class="profile-key">Member:</div>
              <div class="profile-value">{{ profileData['Please enter your first name:'] + ' ' + profileData['Please enter your last name:'] }}</div>
            </div>
            <div class="profile-row">
              <div class="profile-key">Role:</div>
              <div class="profile-value">{{ profileData['In which college or division do you work?'] }}</div>
            </div>
            <div class="profile-row">
              <div class="profile-key">Email:</div>
              <div class="profile-value">{{ profileData['Please enter your email address:'] }}</div>
            </div>
            <div class="profile-row">
              <div class="profile-key">Affiliation:</div>
              <div class="profile-value">{{ profileData['What is your employee classification?'] }}</div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <!-- Confirm button to add member -->
          <v-btn color="primary" @click="addToCommittee">Confirm</v-btn>
          <!-- Cancel button to close the popup -->
          <v-btn color="error" @click="closePopup">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import eventBus from '@/eventBus/eventBus.js';

export default {
  data() {
    return {
      profileData: null,
      selectedCommittee: null,
      isDropdownOpen: false,
      status: 'Unassigned',
      committees: [
        'All', // Add an 'All' option
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
        'Student Health       Committee',
        'University Recreation Committee'
      ],
      showPopupDialog: false
    };
  },
  computed: {
    filteredProfileData() {
      if (!this.profileData) return null;
      const startIndex = 17; // Start index for columns
      return Object.entries(this.profileData)
        .slice(startIndex)
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});
    }
  },
  mounted() {
    // Fetch profile data using the responseId parameter
    const responseId = this.$route.params.responseId;
    // Fetch the profile data corresponding to the responseId from the surveyData stored in localStorage
    this.fetchProfileData(responseId);
  },
  methods: {
    fetchProfileData(responseId) {
      // Retrieve survey data from localStorage
      const storedData = localStorage.getItem('surveyData');
      if (storedData) {
        const surveyData = JSON.parse(storedData);
        // Find the row corresponding to the responseId
        const profileData = surveyData.find(row => row['Response ID'] === responseId);
        // Set the profileData
        this.profileData = profileData || null; // Set to null if profile data is not found
      }
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectCommittee(committee) {
      this.selectedCommittee = committee;
      this.isDropdownOpen = false;
    },
    showPopup() {
      this.showPopupDialog = true;
    },
    closePopup() {
      this.showPopupDialog = false;
    },
    addToCommittee() {
      // Extract specific fields from profileData
      const { member, role, email, affiliation } = this.profileData;
      // Create a new object with the extracted fields
      const memberData = {
        member: member ? `${member['Please enter your first name:']} ${member['Please enter your last name:']}` : '',
        role: role ? role['In which college or division do you work?'] : '',
        email: email ? email['Please enter your email address:'] : '',
        term: '2025',
        affiliation: affiliation ? affiliation['What is your employee classification?'] : ''
      };
      // Emit an event with the extracted memberData
      eventBus.emit('memberAdded', memberData);
      // Close the popup dialog
      this.showPopupDialog = false;
    },
    unassignFromCommittee() {
      // Logic to unassign from committee
      this.selectedCommittee = null;
      this.status = 'Unassigned';
    }
  },
  // Watchers to listen for changes
  watch: {
    // Watch for changes in selectedCommittee
    selectedCommittee(newValue, oldValue) {
      if (newValue !== oldValue) {
        // Perform actions when selectedCommittee changes
      }
    }
  }
};
</script>

<style scoped>
.profile-container {
  text-align: center;
  margin-top: 50px;
}

.profile-title {
  font-size: 24px;
}

.profile-buttons {
  margin-bottom: 20px;
}

.profile-details {
  margin-top: 20px;
  max-width: 800px; /* Adjust the max-width as needed */
  margin-left: auto; /* Align the container to the center horizontally */
  margin-right: auto; /* Align the container to the center horizontally */
}

.profile-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.profile-key {
  font-weight: bold;
}

.profile-no-data {
  margin-top: 20px;
}

.dropdown-button {
  padding: 10px 20px;
  border-radius: 4px;
  margin-right: 10px;
}

.assign-button,
.unassign-button {
  padding: 10px 20px;
  border-radius: 4px;
  margin-right: 10px;
}

.v-list-item-title {
  cursor: pointer;
}
</style>

