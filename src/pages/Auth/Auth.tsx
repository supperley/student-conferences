import { Card, CardBody, Tab, Tabs } from '@nextui-org/react';
import Login from '../../components/Login/Login';
import { useEffect, useState } from 'react';
import Register from '../../components/Register/Register';

const Auth = ({ preSelected = 'login' }) => {
  const [selected, setSelected] = useState(preSelected);

  useEffect(() => {
    setSelected(preSelected);
  }, [preSelected]);

  return (
    <>
      <div className="flex items-center justify-center mt-20">
        <div className="flex flex-col">
          <Card className="max-w-full w-[340px]">
            <CardBody className="overflow-hidden">
              <Tabs
                fullWidth
                size="md"
                selectedKey={selected}
                onSelectionChange={(key) => setSelected(key as string)}>
                <Tab key="login" title="Вход">
                  <Login />
                </Tab>
                <Tab key="sign-up" title="Регистрация">
                  <Register setSelected={setSelected} />
                </Tab>
              </Tabs>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Auth;
