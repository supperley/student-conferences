import { Tab, Tabs } from '@nextui-org/react';
import ManageAccount from '../../components/ManageAccount/ManageAccount';
import PersonalSettings from '../../components/PersonalSettings/PersonalSettings';

const Settings = () => {
  return (
    <div className="my-10">
      <Tabs>
        <Tab key="personal" title="Персональная информация">
          <PersonalSettings />
        </Tab>
        <Tab key="manage" title="Управление аккаунтом">
          <ManageAccount />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Settings;
