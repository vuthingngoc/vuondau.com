import { Container, Row } from 'reactstrap';
import React from 'react';
import { DetailsList, SelectionMode, IconButton, CommandBar, SearchBox } from 'office-ui-fabric-react';
import { getItems } from 'services/data.service';

export default class FarmManagerBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDataloaded: false,
            data: []
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        let url = "api/v1/farms";
        let get_data = getItems(url);
        Promise.all([get_data]).then(values => {
            if (values[0]?.status === 200) {
                this.setState({
                    data: values[0].data,
                })
            }
        }).catch(err => {
            console.log(err);
        })

    }

    _onRenderItemColumn(item, index, column) { //define UI hiển của từng cột mong muốn
        switch (column.fieldName) {
            case 'more_actions':
                let _menuProps = {
                    items: [
                        {
                            key: 'edit',
                            text: 'Edit',
                            onClick: () => {
                                //do something
                            }
                        }
                    ],
                }
                if (item.status === 1) {
                    _menuProps.items.push({
                        key: 'deactivate',
                        text: 'Deactivate',
                        onClick: () => {
                            //do something
                        }
                    });
                } else {
                    _menuProps.items.push({
                        key: 'activate',
                        text: 'Activate',
                        onClick: () => {
                            //do something
                        }
                    });
                }

                return (
                    <div>
                        <IconButton
                            iconProps={{ iconName: "More" }}
                            title="More actions"
                            menuProps={_menuProps}
                        />

                    </div>
                );
            case "status":
                return (
                    item.status === 1 ? "Acitve" : "Deactive"
                );
            default: return (item[column.fieldName]);
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
                            <CommandBar
                                className="commandbar"
                                items={commandBarItems}
                                farItems={commandBarfarItems}
                            />
                        </Row>
                        <Row>
                            <DetailsList
                                className="detail-list"
                                items={this.state.data}
                                columns={columns}
                                selectionMode={SelectionMode.none}
                                onRenderItemColumn={this._onRenderItemColumn}
                            >
                            </DetailsList>
                        </Row>
                    </Container>
                </div>
            </>
        );
    }
}

const columns = [
    {
        key: 'id',
        name: 'Id',
        fieldName: 'id',
        minWidth: 200,
    },
    {
        key: 'name',
        name: 'Name',
        fieldName: 'name',
        minWidth: 200,
    },
    {
        key: 'more_actions',
        name: '',
        fieldName: 'more_actions',
        minWidth: 20,
    },
    {
        key: 'farm_type',
        name: 'Farm Type',
        fieldName: 'farm_type',
        minWidth: 100,
    },
    {
        key: 'farmer',
        name: 'Farmer',
        fieldName: 'farmer',
        minWidth: 100,
    },
    {
        key: 'description',
        name: 'Description',
        fieldName: 'description',
        minWidth: 100,
    },
    {
        key: 'address',
        name: 'Address',
        fieldName: 'address',
        minWidth: 100,
    },
    // {
    //     key: 'date_of_create',
    //     name: 'Created date',
    //     fieldName: 'date_of_create',
    //     minWidth: 80,
    // },
    // {
    //     key: 'date_update',
    //     name: 'Last modified',
    //     fieldName: 'date_update',
    //     minWidth: 80,
    // },
    {
        key: 'status',
        name: 'Status',
        fieldName: 'status',
        minWidth: 50,
    },

]

const commandBarItems = [
    {
        key: 'create',
        text: 'Create',
        iconProps: { iconName: 'Add' },
        onClick: () => {

        }
    },
]

const commandBarfarItems = [
    {
        key: 'search',
        text: '',
        onRender: () => {
            return (
                <SearchBox
                    className="search-box"
                    placeholder="Search"
                    onSearch={newValue => console.log('value is ' + newValue)}
                    disableAnimation
                />
            )
        }
    },
]