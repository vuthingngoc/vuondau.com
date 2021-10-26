import { Container, Row } from 'reactstrap';
import React from 'react';
import { CommandBar, DefaultButton, Image, Dropdown, TextField, Persona, PersonaSize } from 'office-ui-fabric-react';
import moment from 'moment';
import { convertImageToBase64 } from 'services/data.service';
import { ultilities } from 'utils/services.ultils';
import { getItem, getItems } from 'services/data.service';

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
            item._farmer = `${item.farmer.first_name} ${item.farmer.last_name}`
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
            let images = this.state.farmPictures;
            images[0].src = values[0];
            this.setState({
                farmPictures: images
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
                                    <input id="inputChangeAlbum" type="file" accept=".png, .jpeg, .jpg, .bmp, .tiff" onChange={($event) => { this.onChangeAlbum($event) }} style={{ display: 'none' }} />
                                    <DefaultButton iconProps={{ iconName: 'Delete' }} onClick={() => { this.onDeleteImage(imgs[startIndex + i]) }} />
                                    <DefaultButton iconProps={{ iconName: 'Edit' }} onClick={() => { this.onChangeImage(imgs[startIndex + i]) }} />
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

    onDeleteImage(image) {
        console.log(image);
    }

    onChangeImage(image) {
        console.log(image);
    }

    onBtnUploadAlbum() {
        let elem = document.getElementById("inputUploadAlbum");
        elem.click();
    }

    onUploadAlbum(args) {
        let file = args.target.files[0];
        let _convertImageToBase64 = convertImageToBase64(file);
        Promise.all([_convertImageToBase64]).then(values => {
            let images = this.state.farmPictures;
            images.push({
                id: null,
                farmId: this.props?.match?.params?.id,
                src: values[0],
                atl: "..."
            })
            this.setState({
                farmPictures: images
            })
        })
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
                    //on save data function
                    this.setState({
                        displayMode: true
                    })
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
                                                                obj.farm_type_id = value;
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
                                                                obj.area = value;
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
                                                                obj.status = value;
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
                                                <div className="app-field-label-avatar" >Ảnh mẫu nông trại:</div>
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
                                                                text={this.state.data.farmer.first_name + " " + this.state.data.farmer.last_name}
                                                                secondaryText={this.state.data.farmer.phone}
                                                                tertiaryText={this.state.data.farmer.email}
                                                            />
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Row>

                    </Container>
                </div>
            </>
        );
    }
}

