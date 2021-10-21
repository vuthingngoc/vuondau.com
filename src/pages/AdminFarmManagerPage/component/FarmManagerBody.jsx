import { Container, Row } from 'reactstrap';
import React from 'react';
import { DetailsList, SelectionMode, IconButton, CommandBar, SearchBox } from 'office-ui-fabric-react';
import { getItems } from 'services/data.service';

export default class FarmManagerBody extends React.Component {
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
    let url = 'api/v1/farms';
    let get_data = getItems(url);
    Promise.all([get_data])
      .then((values) => {
        if (values[0]?.status === 200) {
          let _data = this.onUpdateDataSource(values[0].data)
          this.setState({
            isDataloaded: true,
            data: _data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onUpdateDataSource(data) {
    for (let item of data) {
      item._farm_type = item.farm_type.name
      item._farmer = `${item.farmer.first_name} ${item.farmer.last_name}`
    }
    return data;
  }

  _onRenderItemColumn(item, index, column) {
    //define UI hiển của từng cột mong muốn
    switch (column.fieldName) {
      case 'no': return(<>{index}</>)
      case 'name':
        let _menuProps = {
          items: [
            {
              key: 'edit',
              text: 'Chỉnh sửa',
              onClick: () => {
                //do something
              },
            },
          ],
        };
        if (item.status === 1) {
          _menuProps.items.push({
            key: 'deactivate',
            text: 'Vô hiệu hóa',
            onClick: () => {
              //do something
            },
          });
        } else {
          _menuProps.items.push({
            key: 'activate',
            text: 'Kích hoạt',
            onClick: () => {
              //do something
            },
          });
        }

        return (
          <div className="app-grid-main-column">
            <div className="app-column-text" style={{ width: '85%' }} >{item['name']}</div>
            <IconButton style={{ width: '10%' }} iconProps={{ iconName: 'More' }} menuIconProps={{iconName: ""}} title="More actions" menuProps={_menuProps} />
          </div>
        );
      case 'status':
        return item.status === 1 ? 'Acitve' : 'Deactive';
      default:
        return item[column.fieldName];
    }
  }

  render() {
    return (
      <>
        <div className="section section-gray-custom">
          <Container>
            <Row className="title-row">
              <br />
            </Row>
            <Row>
              <CommandBar className="commandbar" items={commandBarItems} farItems={commandBarfarItems} />
            </Row>
            <Row>
              <DetailsList
                className="detail-list"
                items={this.state.data}
                columns={columns}
                selectionMode={SelectionMode.none}
                onRenderItemColumn={this._onRenderItemColumn}
              ></DetailsList>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

const columns = [
  {
    key: 'no',
    name: 'Stt',
    fieldName: 'no',
    minWidth: 40,
    maxWidth: 40,
  },
  {
    key: 'name',
    name: 'Tên nông trại',
    fieldName: 'name',
    minWidth: 200,
  },
  {
    key: '_farm_type',
    name: 'Loại nông trại',
    fieldName: '_farm_type',
    minWidth: 100,
  },
  {
    key: '_farmer',
    name: 'Chủ nông trại',
    fieldName: '_farmer',
    minWidth: 100,
  },
  {
    key: 'description',
    name: 'Mô tả',
    fieldName: 'description',
    minWidth: 200,
  },
  {
    key: 'address',
    name: 'Địa chỉ',
    fieldName: 'address',
    minWidth: 100,
  },
  {
    key: 'status',
    name: 'Trạng thái',
    fieldName: 'status',
    minWidth: 100,
  },
];

const commandBarItems = [
  {
    key: 'create',
    text: 'Tạo mới',
    iconProps: { iconName: 'Add' },
    onClick: () => { },
  },
];

const commandBarfarItems = [
  {
    key: 'search',
    text: '',
    onRender: () => {
      return <SearchBox className="search-box" placeholder="Search" onSearch={(newValue) => console.log('value is ' + newValue)} disableAnimation />;
    },
  },
];
