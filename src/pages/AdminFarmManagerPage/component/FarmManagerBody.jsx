import { Container, Row } from 'reactstrap';
import React from 'react';
import { DetailsList, SelectionMode, IconButton } from 'office-ui-fabric-react';

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
        this.setState({
            data: dummyData
        })
    }

    _onRenderItemColumn(item, index, column) { //define UI hiển của từng cột mong muốn
        switch (column.fieldName) {
            case 'command': return (
                <div>
                    <IconButton 
                        iconProps={{ iconName: 'Edit' }}
                        onClick={() => {
                            //do something here
                        }}
                    />
                    <IconButton 
                        iconProps={{ iconName: 'RecycleBin' }}
                        onClick={() => {
                            //do something here
                        }}
                    />
                </div>
            )
            default: return (item[column.fieldName]);
        }
    }

    render() {
        return (
            <>
                <div className="section section-gray">
                    <Container>
                        <Row className="title-row">
                            <br />
                        </Row>
                        <Row>
                            <DetailsList
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
        minWidth: 100,
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
    {
        key: 'command',
        name: '',
        fieldName: 'command',
        minWidth: 100,
    },

]

const dummyData = [
    {
        "id": "d329ef51-fa1e-4dd8-a97a-2aed52c00789",
        "farm_type_id": "c2bb6d98-2246-4cf6-97b1-13befa9df1ba",
        "farmer_id": "f1717573-0ada-4146-a561-4edfe30413de",
        "name": "Vườn ổi Đà Lạt",
        "address": "Đà Lạt",
        "description": "Trồng ổi ở Đà Lạt",
        "date_of_create": "2021-01-10T00:00:00",
        "date_update": "2021-01-10T00:00:00",
        "status": 1
    },
    {
        "id": "1c95360a-697b-44d9-98eb-2e994cd822d1",
        "farm_type_id": "11f57214-a46a-4545-b4f5-83c4b7e60c41",
        "farmer_id": "07f50219-f96c-4d71-9809-cc558a14ee93",
        "name": "Vườn nho Đà Lạt",
        "address": "Đà Lạt",
        "description": "Trồng nho ở Đà Lạt",
        "date_of_create": "2021-01-10T00:00:00",
        "date_update": "2021-01-10T00:00:00",
        "status": 1
    },
    {
        "id": "132c83d1-89f6-4812-a841-546bf7a05c1c",
        "farm_type_id": "8f306770-cf27-40ec-af42-0a15dfbc46bf",
        "farmer_id": "fddfbe92-bfe4-41f0-89d0-36cc351e8c72",
        "name": "Vườn chuối Đà Lạt",
        "address": "Đà Lạt",
        "description": "Trồng chuối ở Đà Lạt",
        "date_of_create": "2021-01-10T00:00:00",
        "date_update": "2021-01-10T00:00:00",
        "status": 1
    },
    {
        "id": "a6e0a920-d7d4-44f0-9f1f-7dd643365807",
        "farm_type_id": "8f306770-cf27-40ec-af42-0a15dfbc46bf",
        "farmer_id": "fddfbe92-bfe4-41f0-89d0-36cc351e8c72",
        "name": "Vườn dâu Đà Lạt",
        "address": "Đà Lạt",
        "description": "Trồng dâu ở Đà Lạt",
        "date_of_create": "2021-01-10T00:00:00",
        "date_update": "2021-01-10T00:00:00",
        "status": 1
    },
    {
        "id": "95d79a20-3ce3-4c30-b339-8bcdbf93825b",
        "farm_type_id": "8f306770-cf27-40ec-af42-0a15dfbc46bf",
        "farmer_id": "fddfbe92-bfe4-41f0-89d0-36cc351e8c72",
        "name": "Vườn cà Đà Lạt",
        "address": "Đà Lạt",
        "description": "Trồng cà ở Đà Lạt",
        "date_of_create": "2021-01-10T00:00:00",
        "date_update": "2021-01-10T00:00:00",
        "status": 1
    }
]