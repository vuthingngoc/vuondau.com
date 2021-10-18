import React, {useState, useEffect} from 'react';
import ColorNavbar from 'components/Navbars/ColorNavbarCustomize';
import FooterBlack from 'components/Footers/FooterBlack';
import FarmPageHeader from 'components/Headers/FarmPageHeader';
import { Container, Row } from 'reactstrap';
import ListFarm from './ListFarmItem';
import { getDataByPath } from 'services/data.service';

export default function FarmByRegion(props) {
  document.documentElement.classList.remove('nav-open');
  React.useEffect(() => {
    document.body.classList.add('register-page');
    document.body.classList.add('full-screen');
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    return function cleanup() {
      document.body.classList.remove('register-page');
      document.body.classList.remove('full-screen');
    };
  });
  const [data, setData] = useState(null);

  useEffect(() => {
    if (data === null) {
      loadData(props.match.params.id);
    }
  });

  async function loadData(id) {
    let url = "api/v1/farms";
    const res = await getDataByPath(url);
    if (res?.status === 200) {
      setData(res.data);
    }
  }

  return (
    <>
      <ColorNavbar />
      <FarmPageHeader />
      <div className="section section-gray">
          <Container>
            <Row>
              <ListFarm items={data !== null ? data : []} />
            </Row>
          </Container>
        </div>
      <FooterBlack />
    </>
  );
}