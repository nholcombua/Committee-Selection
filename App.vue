<template>
  <v-app>
    <!-- Navigation Bar -->
    <v-app-bar app color="#9E1B32" dark>
      <v-toolbar-title>Committee Selection Application</v-toolbar-title>
    </v-app-bar>

    <!-- Side Navigation Bar -->
    <v-navigation-drawer app color="#828A8F">
  <v-list>
    <v-list-item to="/Home-Page">
      <v-list-item-title bold>Home</v-list-item-title>
    </v-list-item>
    <v-list-item to="/awards-committee">
      <v-list-item-title>Awards Committee</v-list-item-title>
    </v-list-item>
    <v-list-item to="/campus-master-plan-committee">
      <v-list-item-title>Campus Master Plan Committee</v-list-item-title>
    </v-list-item>
    <v-list-item to="/campus-security-safety-committee">
      <v-list-item-title>Campus Security and Safety Committee</v-list-item-title>
    </v-list-item>
    <v-list-item to="/committee-university-committees">
      <v-list-item-title>Committee on University Committees</v-list-item-title>
    </v-list-item>
    <v-list-item to="/equal-opportunity-committee">
      <v-list-item-title>Equal Opportunity Committee</v-list-item-title>
    </v-list-item>
    <v-list-item to="/faculty-staff-benefits-committee">
      <v-list-item-title>Faculty and Staff Benefits Committee</v-list-item-title>
    </v-list-item>
    <v-list-item to="/information-technology-committee">
      <v-list-item-title>Information Technology Committee</v-list-item-title>
    </v-list-item>
    <v-list-item to="/intercollegiate-athletics-committee">
      <v-list-item-title>Intercollegiate Athletics Committee</v-list-item-title>
    </v-list-item>
    <v-list-item to="/International-Education-Committee">
      <v-list-item-title>International Education Committee</v-list-item-title>
    </v-list-item>
    <v-list-item to="/Libraries-Committee">
      <v-list-item-title>Libraries Committee</v-list-item-title>
    </v-list-item>
    <v-list-item to="/Parking-and-Transportation-Committee">
      <v-list-item-title>Parking and Transportation Committee</v-list-item-title>
    </v-list-item>
    <v-list-item to="/Student-and-Campus-Life-Committee">
      <v-list-item-title>Student and Campus Life Committee</v-list-item-title>
    </v-list-item>
    <v-list-item to="/Student-Health-Committee">
      <v-list-item-title>Student Health Committee</v-list-item-title>
    </v-list-item>
    <v-list-item to="/University-Recreation-Committee">
      <v-list-item-title>University Recreation Committee</v-list-item-title>
    </v-list-item>
    <!-- Add more list items for other committees -->
  </v-list>
</v-navigation-drawer>




    <!-- Main Content Area -->
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>
