import React from 'react';
import ColorNavbar from 'components/Navbars/ColorNavbarCustomize';
import FooterBlack from 'components/Footers/FooterBlack';
import FarmPageHeader from 'components/Headers/FarmPageHeader';
import { Container, Row } from 'reactstrap';
import ListFarm from './ListFarmItem';
import { getItems, getItem } from 'services/data.service';

export default class FarmByRegion extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isDataloaded: false,
      data: [],
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    let url = "api/v1/farms";
    let get_items = getItems(url);
    Promise.all([get_items]).then(values => {
      if (values[0]?.status === 200) {
        let _temp = [];
        let request$ = [];
        for (let item of values[0].data) {
          _temp.push(item)
          request$.push(getItem("api/v1/farm-pictures", item.id))
        }
        Promise.all(request$).then(images => {
          for (let i = 0; i < images.length; i++) {
            let result = images[i].data;
            if (result.length > 0) {
              _temp[i]["src"] = result[0].src;
              _temp[i]["alt"] = result[0].alt;
            }
          }
          let _data = [];
          switch(this.props.match.url) {
            case "/farms/mien-bac": 
              _data = _temp.filter(item => {
                return item.area.name.toLowerCase().indexOf('bắc') > -1;
              });
              break;
            case "/farms/mien-trung": 
              _data = _temp.filter(item => {
                return item.area.name.toLowerCase().indexOf('trung') > -1;
              });
              break;
            case "/farms/mien-nam": 
              _data = _temp.filter(item => {
                return item.area.name.toLowerCase().indexOf('nam') > -1;
              });
              break;
            default: break;
          }
          this.setState({
            data: _data,
          });
        })
      }
    })
  }

  render() {
    return (
      <>
        <ColorNavbar />
        <FarmPageHeader />
        <div className="section section-gray">
            <Container>
              <Row>
                <ListFarm items={this.state.data} />
              </Row>
            </Container>
          </div>
        <FooterBlack />
      </>
    );
  }
  
}