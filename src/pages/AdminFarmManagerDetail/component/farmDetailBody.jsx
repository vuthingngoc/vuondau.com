import { Container, Row } from 'reactstrap';
import React from 'react';
import { CommandBar, DefaultButton, Image, Dropdown, TextField, Persona, PersonaSize, Pivot, PivotItem } from 'office-ui-fabric-react';
import moment from 'moment';
import { convertImageToBase64 } from 'services/data.service';
import { ultilities } from 'utils/services.ultils';
import { getItem, getItems, addItem, deleteItem, updateItem, uploadImgToImgur } from 'services/data.service';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default class FarmManagerDetailBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDataloaded: false,
            displayMode: true,
            data: null,
            farmTypeOption: [],
            areasOptions: [],
            farmPictures: [],
            _util: new ultilities(),
            listFarmImageChanged: [],
            harvestData: [],
            currentPivot: 0,
        };
        moment.locale('vi')
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        let url = 'api/v1/farms';
        let id = this.props?.match?.params?.id;
        if (!this.state._util.isNullOrUndefined(id)) {
            let get_item = getItem(url, id);
            let get_farm_type = getItems('api/v1/farm-types');
            let get_farm_picture = getItems('api/v1/farm-pictures');
            let get_area = getItems('api/v1/areas');
            Promise.all([get_item, get_farm_type, get_area, get_farm_picture])
                .then((values) => {
                    let _data = [];
                    let _farmType = [];
                    let _areas = []
                    let _farmPictures = [];

                    if (values[0]?.status === 200) {
                        _data = values[0].data
                        if (values[3]?.status === 200) {
                            _farmPictures = this.getImageByFarmId(values[3].data, values[0].data.id)
                        }
                    }
                    if (values[1]?.status === 200) {
                        _farmType = this.convertOption(values[1].data)
                    }
                    if (values[2]?.status === 200) {
                        _areas = this.convertOption(values[2].data)
                    }

                    this.setState({
                        data: { ..._data },
                        farmTypeOption: _farmType,
                        areasOptions: _areas,
                        farmPictures: _farmPictures,
                        isDataloaded: true,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    loadDataHarvest() {
        let farmId = this.props?.match?.params?.id;
        if (!this.state._util.isNullOrUndefined(farmId)) {
            let getHarvest = getItem("api/v1/harvests", farmId);
            Promise.all([getHarvest]).then(async values => {
                if (values[0].status === 200) {
                    let allHarvests = values[0].data;
                    if (allHarvests.length > 0) {
                        let request$ = [];
                        for (let harvest of allHarvests) {
                            request$.push([
                                await getItem("api/v1/harvest-pictures", harvest.id),
                                await getItem("api/v1/harvest-sellings", harvest.id),
                            ])
                        }
                        Promise.all(request$).then(values_1 => {
                            let _harvestData = [];
                            if (values_1.length > 0) {
                                let index = 0;
                                for (let item of values_1) {
                                    let temp = {};
                                    if (item[1].status === 200 && item[1].data.length > 0) {
                                        temp = item[1].data[0];
                                    } else {
                                        temp['harvest'] = allHarvests[index]
                                    }
                                    temp['picture'] = {
                                        src: null,
                                        id: null
                                    }
                                    if (item[0].status === 200 && item[0].data.length > 0) {
                                        temp['picture']['src'] = item[0].data[0].src
                                        temp['picture']['id'] = item[0].data[0].id
                                    } else {
                                        temp['picture']['src'] = require('assets/img/no_image.jpg').default;
                                        temp['picture']['id'] = null;
                                    }
                                    _harvestData.push(temp);
                                    index++;
                                }
                                this.setState({
                                    harvestData: _harvestData
                                })
                            }
                        })
                    }
                }
            })
        }
    }

    convertOption(data) {
        let options = [];
        if (data?.length > 0) {
            for (let item of data) {
                options.push({
                    key: item.id,
                    text: item.name
                })
            }
        }
        return options;
    }

    getImageByFarmId(images, farmId) {
        let result = images.filter(value => {
            return value.farm.id === farmId;
        });
        return result;
    }

    onUpdateDataSource(data) {
        for (let item of data) {
            item._farm_type = item.farm_type.name
            item._farmer = `${item.farmer.full_name}`
        }
        return data;
    }

    onBtnUploadImg() {
        let elem = document.getElementById("inputUploadImg");
        elem.click();
    }

    onUploadImage(args) {
        let file = args.target.files[0];
        let _convertImageToBase64 = convertImageToBase64(file);
        Promise.all([_convertImageToBase64]).then(values => {
            let strBase64 = values[0].replace("data:image/jpeg;base64,", "");
            Promise.all([uploadImgToImgur(strBase64)]).then(response => {
                let images = this.state.farmPictures;
                let request = null;
                let data = {
                    farm_id: this.props.match.params.id,
                    src: response[0].status === 200 ? response[0].data.data.display_url : "",
                    alt: "..."
                }
                if (images.length > 0 && images[0].id !== null) {
                    request = updateItem("api/v1/farm-pictures", images[0].id, data);
                    images[0].src = response[0].status === 200 ? response[0].data.data.display_url : "";
                } else {
                    request = addItem("api/v1/farm-pictures", data);
                    if (images.length === 0) {
                        images.push({
                            id: null,
                            src: response[0].status === 200 ? response[0].data.data.display_url : "",
                            alt: "..."
                        })
                    } else {
                        images[0].src = response[0].status === 200 ? response[0].data.data.display_url : "";
                    }
                }
                Promise.all([request]).then(() => {
                    this.setState({
                        farmPictures: images
                    })
                })
            })
        })
    }

    onRenderListImg(res, row) {
        //default res = [], row = 1;
        let imgs = this.state.farmPictures;
        let elem = [];
        if (imgs?.length > 1) {
            let count_row = imgs.length / 3 + 1;
            if (row > count_row) {
                return res;
            }
            let startIndex = (row - 1) * 3;
            for (let i = 1; i < 4; i++) {
                if (imgs[startIndex + i]) {
                    elem.push(
                        <div style={{ display: 'block', maxWidth: 215 }}>
                            <Image className="app-image-fit-contain " src={imgs[startIndex + i].src} />
                            {
                                !this.state.displayMode &&
                                <div className="app-footer-btn">
                                    <input id="inputChangeAlbum" type="file" accept=".png, .jpeg, .jpg, .bmp, .tiff" onChange={($event) => { this.onChangeAlbum($event, imgs[startIndex + i]) }} style={{ display: 'none' }} />
                                    <DefaultButton iconProps={{ iconName: 'Delete' }} onClick={() => { this.onDeleteImage(imgs[startIndex + i]) }} />
                                    <DefaultButton iconProps={{ iconName: 'Edit' }} onClick={() => { this.onChangeImage() }} />
                                </div>
                            }
                        </div>
                    )
                }
            }
            res.push(<div className="app-item-img">{elem}</div>);
            return this.onRenderListImg(res, row + 1)
        }

        return res;
    }

    onChangeAlbum(args, img) {
        let file = args.target.files[0];
        let _convertImageToBase64 = convertImageToBase64(file);
        Promise.all([_convertImageToBase64]).then(values => {
            let strBase64 = values[0].replace("data:image/jpeg;base64,", "");
            Promise.all([uploadImgToImgur(strBase64)]).then(response => {
                let data = {
                    farm_id: this.props.match.params.id,
                    src: response[0].status === 200 ? response[0].data.data.display_url : "",
                    alt: "..."
                }
                let request = updateItem("api/v1/farm-pictures", img.id, data);
                Promise.all([request]).then(res => {
                    if(res[0].status === 200) {
                        NotificationManager.success('Updated', 'Your Image has been changed', 3000);
                    }
                    this.loadData();
                })
            })
        })
    }

    onDeleteImage(image) {
        let imageId = image.id;
        let deleteImage = deleteItem("api/v1/farm-pictures", imageId);
        Promise.all([deleteImage]).then(values => {
            if(values[0].status === 200) {
                NotificationManager.success('Deleted', 'Your Image has been deleted', 3000);
                this.loadData();
            }
        })
    }

    onChangeImage() {
        let elem = document.getElementById("inputChangeAlbum");
        elem.click();
    }

    onBtnUploadAlbum() {
        let elem = document.getElementById("inputChangeAlbum");
        elem.click();
    }

    onUploadAlbum(args) {
        let file = args.target.files[0];
        let _convertImageToBase64 = convertImageToBase64(file);
        Promise.all([_convertImageToBase64]).then(values => {
            let strBase64 = values[0].replace("data:image/jpeg;base64,", "");
            Promise.all([uploadImgToImgur(strBase64)]).then(response => {
                let images = this.state.farmPictures;
                let request = null;
                let data = {
                    farm_id: this.props.match.params.id,
                    src: response[0].status === 200 ? response[0].data.data.display_url : "",
                    alt: "..."
                }
                request = addItem("api/v1/farm-pictures", data);
                images.push({
                    id: null,
                    src: response[0].status === 200 ? response[0].data.data.display_url : "",
                    alt: "..."
                })
                Promise.all([request]).then(() => {
                    this.setState({
                        farmPictures: images
                    })
                })
            })
        })
    }

    handlePivotClick(item) {
        if (item) {
            switch (item.props.itemKey) {
                case "farm":
                    this.loadData();
                    this.setState({
                        currentPivot: 0
                    })
                    break;
                case "harvest":
                    this.loadDataHarvest();
                    this.setState({
                        currentPivot: 1
                    })
                    break;
                default: break;
            }
        }
    }

    validateItemBeforeSave() {
        let isValid = true;
        if (this.state.farmPictures.length === 0) {
            return false;
        }
        return isValid;
    }

    formatItemBeforeSave() {
        let data = this.state.data;
        let item = {
            farm_type_id: data.farm_type.id,
            farmer_id: data.farmer.id,
            name: data.name,
            area_id: data.area.id,
            address: data.address,
            description: data.description,
            status: data.status
        };

        return item;
    }

    onSaveClick() {
        if (this.validateItemBeforeSave()) {
            let item = this.formatItemBeforeSave();
            let req$ = updateItem("api/v1/farms", this.props?.match?.params?.id, item);
            Promise.all([req$]).then(values => {
                if (this.state.currentPivot === 0) {
                    NotificationManager.success('Save', 'Your data has been saved', 3000);
                    this.loadData();
                } else if (this.state.currentPivot === 1) {
                    NotificationManager.success('Save', 'Your data has been saved', 3000);
                    this.loadDataHarvest();
                }
                this.setState({
                    displayMode: true
                })
            })
        } else {
            alert("Vui lòng tải ảnh trước khi lưu.")
        }
    }

    render() {
        let commandBarfarItemsDisplayMode = [
            {
                key: 'edit',
                text: 'Chỉnh sửa',
                className: 'editButton',
                iconProps: { iconName: 'Edit' },
                onClick: () => {
                    this.setState({
                        displayMode: false
                    })
                }
            }
        ];

        let commandBarfarItemsEditMode = [
            {
                key: 'cancel',
                text: 'Hủy',
                className: 'cancelButton',
                iconProps: { iconName: 'Cancel' },
                onClick: () => {
                    this.loadData();
                    this.setState({
                        displayMode: true
                    })
                }
            },
            {
                key: 'save',
                text: 'Lưu lại',
                className: 'saveButton',
                iconProps: { iconName: 'Save' },
                onClick: () => {
                    this.onSaveClick();
                }
            },
        ];
        return (
            <>
                <div className="section section-gray-custom">
                    <Container>
                        <Row className="title-row">
                            <br />
                        </Row>
                        <Row>
                            <Pivot style={{ width: "100%" }} onLinkClick={(item) => { this.handlePivotClick(item) }}>
                                <PivotItem headerText="Nông trại" itemKey="farm">
                                    <div className="app-content">
                                        <CommandBar className="commandbar" farItems={this.state.displayMode ? commandBarfarItemsDisplayMode : commandBarfarItemsEditMode} />
                                        <div className="app-farmdetail-container">
                                            <div className="app-farm-name">
                                                {
                                                    this.state.displayMode ? this.state.data?.name :
                                                        <TextField value={this.state.data?.name} onChange={(event, value) => {
                                                            let obj = this.state.data;
                                                            obj.name = value;
                                                            this.setState({
                                                                data: obj
                                                            })
                                                        }} />
                                                }
                                            </div>
                                            <br />
                                            <div style={{ display: 'flex', margin: '24px', justifyContent: 'space-between' }}>
                                                <div className="app-detail-left">
                                                    <br />
                                                    <div className="app-field-wrap" >
                                                        <div className="app-field-label" >Loại Nông trại:</div>
                                                        <div className="app-field-control" >
                                                            {
                                                                this.state.data &&
                                                                <Dropdown
                                                                    options={this.state.farmTypeOption}
                                                                    disabled={this.state.displayMode}
                                                                    onChange={(event, value) => {
                                                                        let obj = this.state.data;
                                                                        obj.farm_type = {
                                                                            id: value.key,
                                                                            name: value.text
                                                                        };
                                                                        this.setState({
                                                                            data: obj
                                                                        })
                                                                    }}
                                                                    defaultSelectedKey={[this.state.data.farm_type.id]}
                                                                />
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="app-field-wrap" >
                                                        <div className="app-field-label" >Mô tả:</div>
                                                        <div className="app-field-control" style={{ height: '100px' }} >
                                                            {
                                                                this.state.data &&
                                                                <TextField
                                                                    value={this.state.data.description}
                                                                    multiline
                                                                    row={5}
                                                                    resizable={false}
                                                                    disabled={this.state.displayMode}
                                                                    onChange={(event, newValue) => {
                                                                        let obj = this.state.data;
                                                                        obj.description = newValue
                                                                        this.setState({
                                                                            data: obj
                                                                        })
                                                                    }}
                                                                />
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="app-field-wrap" >
                                                        <div className="app-field-label" >Vùng:</div>
                                                        <div className="app-field-control" >
                                                            {
                                                                this.state.data &&
                                                                <Dropdown
                                                                    options={this.state.areasOptions}
                                                                    disabled={this.state.displayMode}
                                                                    onChange={(event, value) => {
                                                                        let obj = this.state.data;
                                                                        obj.area = {
                                                                            id: value.key,
                                                                            name: value.text
                                                                        };
                                                                        this.setState({
                                                                            data: obj
                                                                        })
                                                                    }}
                                                                    defaultSelectedKey={[this.state.data.area.id]}
                                                                />
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="app-field-wrap" >
                                                        <div className="app-field-label" >Trạng thái:</div>
                                                        <div className="app-field-control" >
                                                            {
                                                                this.state.data &&
                                                                <Dropdown
                                                                    options={[{ key: 0, text: 'Không hoạt động' }, { key: 1, text: 'Hoạt động' }]}
                                                                    disabled={this.state.displayMode}
                                                                    onChange={(event, value) => {
                                                                        let obj = this.state.data;
                                                                        obj.status = value.key;
                                                                        this.setState({
                                                                            data: obj
                                                                        })
                                                                    }}
                                                                    defaultSelectedKey={[this.state.data.status]}
                                                                />
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="app-field-wrap" style={{ display: 'block' }}>
                                                        <div style={{ display: 'flex' }}>
                                                            <div className="app-field-label" >Album ảnh:</div>
                                                            <input id="inputUploadAlbum" type="file" accept=".png, .jpeg, .jpg, .bmp, .tiff" onChange={($event) => { this.onUploadAlbum($event) }} style={{ display: 'none' }} />
                                                            <div className="app-field-control" >{
                                                                !this.state.displayMode &&
                                                                <DefaultButton className="app-btn-uploadImange" text="Tải ảnh" onClick={() => {
                                                                    this.onBtnUploadAlbum();
                                                                }} />
                                                            }</div>
                                                        </div>
                                                        <div className="app-field-control-listImage" >
                                                            {
                                                                this.state.data &&
                                                                this.onRenderListImg([], 1)
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="app-detail-right">
                                                    <br />
                                                    <div className="app-field-wrap" style={{ display: 'block' }}>
                                                        <div className="app-field-label-avatar" aria-required >Ảnh mẫu nông trại:</div>
                                                        <div className="app-field-control-avatar" >
                                                            {
                                                                this.state.data && this.state.farmPictures.length > 0 ?
                                                                    <Image className="app-image-fit-contain" src={this.state.farmPictures[0].src} />
                                                                    : <img className="app-image-fit-contain" alt="..." src={require('assets/img/no_image.jpg').default} />
                                                            }
                                                        </div>
                                                        <input id="inputUploadImg" type="file" accept=".png, .jpeg, .jpg, .bmp, .tiff" onChange={($event) => { this.onUploadImage($event) }} style={{ display: 'none' }} />
                                                        {
                                                            !this.state.displayMode &&
                                                            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                                                                <DefaultButton className="app-btn-uploadImange" text={this.state.farmPictures.length > 0 ? "Thay đổi ảnh" : "Tải ảnh"} onClick={() => {
                                                                    this.onBtnUploadImg();
                                                                }} />
                                                            </div>
                                                        }

                                                    </div>
                                                    <div className="app-field-wrap" >
                                                        <div className="app-field-label" >Ngày tạo:</div>
                                                        <div className="app-field-control" >
                                                            {
                                                                this.state.data &&
                                                                moment(new Date(this.state.data.date_of_create)).format("MM/DD/YYYY, h:mm:ss A")
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="app-field-wrap" >
                                                        <div className="app-field-label" >Chỉnh sửa:</div>
                                                        <div className="app-field-control" >
                                                            {
                                                                this.state.data &&
                                                                moment(new Date(this.state.data.date_update)).format("MM/DD/YYYY, h:mm:ss A")
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="app-field-wrap" style={{ display: 'block' }}>
                                                        <div className="app-field-label" >Chủ nông trại:</div>
                                                        <div className="app-field-control" style={{ display: 'flex' }}>
                                                            <br />
                                                            {
                                                                this.state.data &&
                                                                <div>
                                                                    <br />
                                                                    <Persona
                                                                        size={PersonaSize.size72}
                                                                        text={this.state.data.farmer?.full_name}
                                                                        secondaryText={this.state.data.farmer?.phone}
                                                                        tertiaryText={this.state.data.farmer?.email}
                                                                    />
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </PivotItem>
                                <PivotItem headerText="Vụ mùa" itemKey="harvest">
                                    <div className="app-content">
                                        <CommandBar className="commandbar" farItems={this.state.displayMode ? commandBarfarItemsDisplayMode : commandBarfarItemsEditMode} />
                                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                            <div className="app-harvest-content">
                                                {
                                                    this.state.harvestData.length === 0 ?
                                                        "Nông trại chưa tạo vụ mùa." :
                                                        this.state.harvestData.map(item => {
                                                            return (
                                                                <div className="app-section-content">
                                                                    <div className="app-content-middle">
                                                                        <Image className="app-image-fit-contain" src={item.picture.src} />
                                                                    </div>
                                                                    <div className="app-content-right" style={{ width: '35%' }}>
                                                                        <div className="app-content-title">{item.harvest.name}</div>
                                                                        <div className="app-content-body">
                                                                            <div className="app-content-wrap">Sản phẩm: {item.harvest.product.name}</div>
                                                                            <div className="app-content-wrap">Tổng khối lượng: {item.total_weight} kg</div>
                                                                            <div className="app-content-wrap">Ngày kết thúc: {moment(new Date(item.end_date)).format("DD/MM/yyyy")}</div>
                                                                            <div className="app-content-wrap">Campaign: {item.campaign !== null ? (item.campaign ? (item.campaign.name ? item.campaign.name : "Không lấy được campaign") : "Vụ mùa chưa được tạo") : "Chưa có campaign"}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })
                                                }
                                            </div>

                                        </div>
                                    </div>
                                </PivotItem>
                            </Pivot>
                        </Row>
                        <Row>

                        </Row>

                    </Container>
                </div>
            </>
        );
    }
}

