import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/Home-Page.vue';
import ProfilePage from '../views/Profile-Page.vue';
import AwardsCommittee from '../views/Awards-Committee.vue';
import CampusMasterPlanCommittee from '../views/Campus-Master-Plan-Committee.vue';
import CampusSecuritySafetyCommittee from '../views/Campus-Security-Safety-Committee.vue';
import CommitteeOnUniversityCommittees from '../views/Committee-University-Committees.vue';
import EqualOpportunityCommittee from '../views/Equal-Opportunity-Committee.vue';
import FacultyStaffBenefitsCommittee from '../views/Faculty-Staff-Benefits-Committee.vue';
import InformationTechnologyCommittee from '../views/Information-Technology-Committee.vue';
import IntercollegiateAthleticsCommittee from '../views/Intercollegiate-Athletics-Committee.vue';
import InternationalEducationCommittee from '../views/International-Education-Committee.vue';
import LibrariesCommittee from '../views/Libraries-Committee.vue';
import ParkingTransportationCommittee from '../views/Parking-and-Transportation-Committee.vue';
import StudentCampusLifeCommittee from '../views/Student-and-Campus-Life-Committee.vue';
import StudentHealthCommittee from '../views/Student-Health-Committee.vue';
import UniversityRecreationCommittee from '../views/University-Recreation-Committee.vue';

const routes = [
  {path: '/',component: HomePage },
  { path: '/profile-page/:responseId', name: 'Profile', component: ProfilePage },
 // { path: '/profile-page', component: ProfilePage},
  {path: '/home-page', component: HomePage },
  { path: '/awards-committee', component: AwardsCommittee },
  { path: '/campus-master-plan-committee', component: CampusMasterPlanCommittee },
  { path: '/campus-security-safety-committee', component: CampusSecuritySafetyCommittee },
  { path: '/committee-university-committees', component: CommitteeOnUniversityCommittees },
  { path: '/equal-opportunity-committee', component: EqualOpportunityCommittee },
  { path: '/faculty-staff-benefits-committee', component: FacultyStaffBenefitsCommittee },
  { path: '/information-technology-committee', component: InformationTechnologyCommittee },
  { path: '/intercollegiate-athletics-committee', component: IntercollegiateAthleticsCommittee },
  { path: '/international-education-committee', component: InternationalEducationCommittee },
  { path: '/libraries-committee', component: LibrariesCommittee },
  { path: '/parking-and-transportation-committee', component: ParkingTransportationCommittee },
  { path: '/student-and-campus-life-committee', component: StudentCampusLifeCommittee },
  { path: '/student-health-committee', component: StudentHealthCommittee },
  { path: '/university-recreation-committee', component: UniversityRecreationCommittee },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;