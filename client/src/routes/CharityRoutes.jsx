import { Routes, Route } from 'react-router-dom';
import CharityDashboard from '../pages/charity/CharityDashboard';
import BeneficiariesPage from '../pages/beneficiary/Beneficiary';
// import BeneficiaryManagement from '../pages/charity/BeneficiaryManagement';
import StoryManagement from '../pages/charity/StoryManagement';
import CharityDetails from '../pages/charity/CharityDetails';
import InventoryPage from '../pages/inventory/Inventory';

const CharityRoutes = () => {
  return (
    <Routes>
      <Route path="/:id" element={<CharityDashboard />} />
      <Route path="/:id/beneficiaries" element={<BeneficiariesPage />} />
      <Route path="/:id/inventory" element={<InventoryPage />} />
      <Route path="/:id/stories" element={<StoryManagement />} />
      <Route path="charity-details" element={<CharityDetails />} />
      {/* <Route path="inventory" element={<Inventory charityId={1} />} /> */}
    </Routes>
  );
};

export default CharityRoutes;
