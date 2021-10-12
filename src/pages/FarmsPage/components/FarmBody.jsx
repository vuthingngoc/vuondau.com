import React from 'react';

import { Container, Row } from 'reactstrap';
import { Shimmer, ShimmerElementsGroup, ShimmerElementType as ElemType, Dropdown } from 'office-ui-fabric-react';
import { Col } from 'react-bootstrap';
import ListFarm from './ListFarmItem';

const dataFarms = [
    {
        farmName: 'Nông Trại đà lạt vụ mùa xuân',
        address: 'Thành Phố Hồ Chí Minh',
        heart: 56,
        image: 'https://farmstay.com.vn/wp-content/uploads/2019/08/DL-trai-mat-2.jpg',
        description: 'Các loại rau củ của nông trại đà lạc mùa xuân',
        src: '/havests/havestdetail/',
    },
    {
        farmName: 'Nông Trại đà lạt vụ mùa hạ',
        ordered: 352,
        image: 'https://farmstay.com.vn/wp-content/uploads/2019/08/DL-trai-mat-4.jpg',
        description: 'Các loại rau củ của nông trại đà lạc mùa hạ',
        src: '/havests/havestdetail/',
    },
    {
        farmName: 'Nông Trại đà lạt vụ mùa thu',
        ordered: 123,
        image: 'https://farmstay.com.vn/wp-content/uploads/2019/08/DL-trai-mat-3.jpg',
        description: 'Các loại rau củ của nông trại đà lạc mùa đông',
        src: '/havests/havestdetail/',
    },
    {
        farmName: 'Nông Trại đà lạt vụ mùa đông',
        ordered: 431,
        image: 'https://farmstay.com.vn/wp-content/uploads/2019/08/DL-cau-dat-farm-3.jpg',
        description: 'Các loại rau củ của nông trại đà lạc mùa đông',
        src: '/havests/havestdetail/',
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

const getShimmerElements = () => {
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



export default function FarmBody() {
    React.useEffect(() => {
        loadData();
    });


    const [isDataloaded, setIsDataloaded] = React.useState(false);

    const loadData = () => {
        setTimeout(function () {
            setIsDataloaded(true);
        }, 3000)
    }

    const onDropDownChanged = (newValue) => {
        setIsDataloaded(false);
        loadData();
    }

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
                                    onDropDownChanged(value);
                                }}
                            />
                        </Col>
                        <Col xs="9">
                            <Shimmer width="100%" isDataLoaded={isDataloaded} customElementsGroup={getShimmerElements()}>
                                <ListFarm 
                                    items={dataFarms}
                                />
                            </Shimmer>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}
