import React from 'react';

import { Container, Row } from 'reactstrap';
import { Shimmer, ShimmerElementsGroup, ShimmerElementType as ElemType, Dropdown } from 'office-ui-fabric-react';
import { Col } from 'react-bootstrap';
import ListFarm from './ListFarmItem';

const dataFarms = [
    {
        id: 1,
        farmName: 'Nông Trại đà lạt vụ mùa xuân',
        address: 'Thành Phố Hồ Chí Minh',
        image: 'https://farmstay.com.vn/wp-content/uploads/2019/08/DL-trai-mat-2.jpg',
        description: 'Các loại rau củ của nông trại đà lạc mùa xuân',
    },
    {
        id: 2,
        farmName: 'Nông Trại đà lạt vụ mùa hạ',
        ordered: 352,
        image: 'https://farmstay.com.vn/wp-content/uploads/2019/08/DL-trai-mat-4.jpg',
        description: 'Các loại rau củ của nông trại đà lạc mùa hạ',
    },
    {
        id: 3,
        farmName: 'Nông Trại đà lạt vụ mùa thu',
        ordered: 123,
        image: 'https://farmstay.com.vn/wp-content/uploads/2019/08/DL-trai-mat-3.jpg',
        description: 'Các loại rau củ của nông trại đà lạc mùa đông',
    },
    {
        id: 4,
        farmName: 'Nông Trại đà lạt vụ mùa đông',
        ordered: 431,
        image: 'https://farmstay.com.vn/wp-content/uploads/2019/08/DL-cau-dat-farm-3.jpg',
        description: 'Các loại rau củ của nông trại đà lạc mùa đông',
    },
];

const dataLocation = [
    {
        key: 'nam',
        text: 'Miền Nam',
    },
    {
        key: 'trung',
        text: 'Miền Trung',
    },
    {
        key: 'bac',
        text: 'Miền Bắc',
    },
];

export default class FarmDetailBody extends React.Component {
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

    render() {
        return (
            <>
                <div className="section section-gray">
                    <Container>
                        <Row>
                            <Col sm="3">
                                <Dropdown
                                    placeholder="Select your location"
                                    options={dataLocation}
                                    style={{ width: '70%' }}
                                    onChange={(event, value) => {
                                        this.onDropDownChanged(value);
                                    }}
                                />
                            </Col>
                            <Col xs="9">
                                <Shimmer width="100%" isDataLoaded={this.state.isDataloaded} customElementsGroup={this.getShimmerElements()}>
                                    <ListFarm
                                        items={this.state.data}
                                    />
                                </Shimmer>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </>
        )
    }

    getShimmerElements() {
        return (
            <>
                <div style={{ display: 'flex' }}>
                    <ShimmerElementsGroup
                        width={'25%'}
                        shimmerElements={[
                            { type: ElemType.gap, width: '5%', height: 200 },
                            { type: ElemType.line, width: '90%', height: 180 },
                            { type: ElemType.gap, width: '5%', height: 200 },
                        ]}
                    />
                    <ShimmerElementsGroup
                        width={'100%'}
                        flexWrap
                        shimmerElements={[
                            { type: ElemType.line, width: '98%', height: 25 },
                            { type: ElemType.gap, width: '2%', height: 50 },
                            { type: ElemType.line, width: '98%', height: 25 },
                            { type: ElemType.gap, width: '2%', height: 50 },
                            { type: ElemType.line, width: '98%', height: 25 },
                            { type: ElemType.gap, width: '2%', height: 50 },
                            { type: ElemType.line, width: '98%', height: 25 },
                            { type: ElemType.gap, width: '2%', height: 50 },
                        ]}
                    />
                </div>
                <div style={{ display: 'flex' }}>
                    <ShimmerElementsGroup
                        width={'25%'}
                        shimmerElements={[
                            { type: ElemType.gap, width: '5%', height: 200 },
                            { type: ElemType.line, width: '90%', height: 180 },
                            { type: ElemType.gap, width: '5%', height: 200 },
                        ]}
                    />
                    <ShimmerElementsGroup
                        width={'100%'}
                        flexWrap
                        shimmerElements={[
                            { type: ElemType.line, width: '98%', height: 25 },
                            { type: ElemType.gap, width: '2%', height: 50 },
                            { type: ElemType.line, width: '98%', height: 25 },
                            { type: ElemType.gap, width: '2%', height: 50 },
                            { type: ElemType.line, width: '98%', height: 25 },
                            { type: ElemType.gap, width: '2%', height: 50 },
                            { type: ElemType.line, width: '98%', height: 25 },
                            { type: ElemType.gap, width: '2%', height: 50 },
                        ]}
                    />
                </div>
                <div style={{ display: 'flex' }}>
                    <ShimmerElementsGroup
                        width={'25%'}
                        shimmerElements={[
                            { type: ElemType.gap, width: '5%', height: 200 },
                            { type: ElemType.line, width: '90%', height: 180 },
                            { type: ElemType.gap, width: '5%', height: 200 },
                        ]}
                    />
                    <ShimmerElementsGroup
                        width={'100%'}
                        flexWrap
                        shimmerElements={[
                            { type: ElemType.line, width: '98%', height: 25 },
                            { type: ElemType.gap, width: '2%', height: 50 },
                            { type: ElemType.line, width: '98%', height: 25 },
                            { type: ElemType.gap, width: '2%', height: 50 },
                            { type: ElemType.line, width: '98%', height: 25 },
                            { type: ElemType.gap, width: '2%', height: 50 },
                            { type: ElemType.line, width: '98%', height: 25 },
                            { type: ElemType.gap, width: '2%', height: 50 },
                        ]}
                    />
                </div>
            </>
        )
    }

    loadData() {
        setTimeout(() => {
            this.setState({ 
                isDataloaded: true,
                data: dataFarms
            });
        }, 3000)
    }
}

// export default function FarmBody() {
//     let flag = false;
//     React.useEffect(() => {
//         if (!flag) {
//             loadData();
//             flag = true;
//         }
//     });

//     const [isDataloaded, setIsDataloaded] = React.useState(false);

//     const loadData = () => {
//         setTimeout(function () {
//             setIsDataloaded(true);
//         }, 3000)
//     }

//     const onDropDownChanged = (newValue) => {
//         setIsDataloaded(false);
//         loadData();
//     }

//     return (
//         
//     );
// }
