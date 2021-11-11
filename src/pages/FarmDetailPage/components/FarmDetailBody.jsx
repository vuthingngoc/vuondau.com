import { Container, Button } from 'reactstrap';
import React from 'react';
import { ultilities } from 'utils/services.ultils';
import { getItem } from 'services/data.service';
import { Image } from 'office-ui-fabric-react'
import moment from 'moment';

export default class FarmDetailBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataloaded: false,
      colorSelect: {
        value: '1',
        label: 'Cà chua',
      },
      data: null,
      harvests: [],
      activeIndex: 0,
      animating: false,
      _util: new ultilities(),
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    let url = 'api/v1/farm-pictures';
    let id = this.props?.match?.params?.id;
    if (!this.state._util.isNullOrUndefined(id)) {
      let get_item = getItem(url, id);
      let get_havrest = getItem('api/v1/harvests', id);
      Promise.all([get_item, get_havrest])
        .then((values) => {
          if (values[0]?.status === 200) {
            let _data = null;
            for (let item of values[0].data) {
              _data = _data ? _data : item["farm"];
              _data["picture"] = _data["picture"] ? _data["picture"] : []
              _data["picture"].push({
                id: item["id"],
                src: item["src"],
                alt: item["alt"]
              })
            }
            this.setState({
              data: _data
            });
          }
          if (values[1].status === 200) {
            let request$ = [];
            for (let item of values[1].data) {
              request$.push(getItem('api/v1/harvest-pictures', item["id"]));
            }
            Promise.all(request$).then(allHarvests => {
              let request$_2 = [];
              for (let i = 0; i < allHarvests.length; i++) {
                request$_2.push(getItem('api/v1/harvest-sellings', allHarvests[i].data[0].harvest.id));

              }
              Promise.all(request$_2).then(allHarvestSelling => {
                let _harvest = [];
                for (let i = 0; i < allHarvestSelling.length; i++) {
                  for (let hs of allHarvestSelling[i].data) {
                    let data = {
                      harvestId: hs.id,
                      harvest: hs.harvest,
                      picture: {
                        id: allHarvests[i].data[0]["id"],
                        src: allHarvests[i].data[0]["src"],
                        alt: allHarvests[i].data[0]["alt"]
                      },
                      campaign: hs.campaign,
                      end_date: moment(new Date(hs.end_date)).format("DD/MM/yyyy"),
                      total_weight: hs.total_weight
                    }
                    if (new Date(hs.end_date) > new Date()) {
                      _harvest.push(data);
                    }
                  }
                }
                this.setState({
                  harvests: _harvest,
                  isDataloaded: true
                })
              })

            })
          } else {
            this.setState({
              harvests: [],
              isDataloaded: true
            })
          }

        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  render() {
    return (
      <>
        <div className="section section-gray-custom">
          <Container>
            <div className="app-section-title">{this.state.data?.name}</div>
            <div className="app-section-content">
              <div className="app-content-left">
                <div className="app-about-item">
                  <div className="app-about-icon">
                    <img src="//theme.hstatic.net/200000301734/1000687235/14/hab_left_icon_1.png?v=213" alt="" />
                  </div>
                  <div className="app-about-content">Hoàn toàn tự nhiên</div>
                  <div className="app-about-description">Không sử dụng các loại giống biến đổi gen.</div>
                </div>
                <div className="app-about-item">
                  <div className="app-about-icon">
                    <img src="//theme.hstatic.net/200000301734/1000687235/14/hab_left_icon_2.png?v=213" alt="" />
                  </div>
                  <div className="app-about-content">100% hữu cơ sạch</div>
                  <div className="app-about-description">Không sử dụng bất cứ một loại thuốc trừ sâu, thuốc diệt cỏ và thuốc kích thích nào.</div>
                </div>
              </div>
              <div className="app-content-middle">
                <Image className="app-image-fit-contain" src={this.state.data?.picture[0]?.src} />
              </div>
              <div className="app-content-right">
                <div className="app-about-item">
                  <div className="app-about-icon">
                    <img src="//theme.hstatic.net/200000301734/1000687235/14/hab_right_icon_1.png?v=213" alt="" />
                  </div>
                  <div className="app-about-content">100% phân bón hữu cơ</div>
                  <div className="app-about-description">Chỉ sử dụng duy nhất các loại phân bón 100% từ hữu cơ.</div>
                </div>
                <div className="app-about-item">
                  <div className="app-about-icon">
                    <img src="//theme.hstatic.net/200000301734/1000687235/14/hab_right_icon_2.png?v=213" alt="" />
                  </div>
                  <div className="app-about-content">Chất lượng tốt nhất</div>
                  <div className="app-about-description">Luôn tươi ngon, an toàn, chất lượng.</div>
                </div>
              </div>
            </div>
            <div className="app-section-title">Vụ mùa hiện có</div>
            {
              this.state.harvests.map(item => {
                return (
                  <div className="app-section-content">
                    <div className="app-content-middle">
                      <Image className="app-image-fit-contain" src={item.picture?.src} />
                    </div>
                    <div className="app-content-right" style={{ width: '35%' }}>
                      <div className="app-content-title">{item.harvest.name}</div>
                      <div className="app-content-body">
                        <div className="app-content-wrap">Sản phẩm: {item.harvest.product.name}</div>
                        <div className="app-content-wrap">Tổng khối lượng: {item.total_weight} kg</div>
                        <div className="app-content-wrap">Ngày kết thúc: {item.end_date}</div>
                        <Button className="btn-round" href={`/harvests/harvestdetail/${item.harvestId}`} color="info">
                          Xem chi tiết
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            }
            {/* <div className="app-section-content">
              <div className="app-content-middle">
                <img className="app-image-fit-contain" src={this.state.data?.picture?.src} alt={this.state.data ? this.state.data.picture?.alt : "..."} />
              </div>
              <div className="app-content-right" style={{ width: '35%' }}>
                <div className="app-content-title">Vụ mùa thu</div>
                <div className="app-content-body">
                  <div className="app-content-wrap">Sản phẩm: chuối</div>
                  <div className="app-content-wrap">Đã đặt: 125 người</div>
                  <div className="app-content-wrap">Giá dự kiến: 18.000 vnđ / kg</div>
                  <div className="app-content-wrap">Mô tả: Vườn chuối ở Đà Lạt</div>
                  <Button className="btn-round" color="info">
                    Xem chi tiết
                  </Button>
                </div>
              </div>
            </div> */}
            <div className="app-section-title">Giới thiệu</div>
            <div className="app-section-content">
              <div className="app-content-middle">
                <Image className="app-image-fit-contain" src={this.state.data?.picture[1] ? this.state.data?.picture[1].src : require('assets/img/no_image.jpg').default} />
              </div>
              <div className="app-content-right" style={{ width: '35%' }}>
                <div className="app-content-title">{this.state.data?.name}</div>
                <div className="app-content-body">
                  <div className="app-content-wrap">Địa chỉ: {this.state.data?.address}</div>
                  <div className="app-content-wrap">Mô tả: {this.state.data?.description}</div>
                  <div className="app-content-wrap">Loại nông trại: {this.state.data?.farm_type?.name}</div>
                  <div className="app-content-wrap">Chủ nông trại: {this.state.data?.farmer?.full_name}</div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </>
    );
  }
}
