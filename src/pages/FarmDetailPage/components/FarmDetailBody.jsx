import { Container, Button } from 'reactstrap';
import React from 'react';
import { ultilities } from 'utils/services.ultils';
import { getItem } from 'services/data.service';

export default class FarmDetailBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataloaded: false,
      colorSelect: {
        value: '1',
        label: 'Cà chua',
      },
      data: [],
      activeIndex: 0,
      animating: false,
      _util: new ultilities(),
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    let url = 'api/v1/farms';
    let id = this.props?.match?.params?.id;
    if (!this.state._util.isNullOrUndefined(id)) {
      let get_item = getItem(url, id);
      Promise.all([get_item])
        .then((values) => {
          if (values[0]?.status === 200) {
            this.setState({
              data: values[0].data,
              isDataloaded: true,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  goToIndex(newIndex) {
    if (this.state.animating) return;
    this.setState({
      activeIndex: newIndex,
    });
  }

  onExiting() {
    this.setState({
      animating: true,
    });
  }
  onExited() {
    this.setState({
      animating: false,
    });
  }
  next() {
    if (this.state.animating) return;
    const nextIndex = this.state.activeIndex === carouselItems.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({
      activeIndex: nextIndex,
    });
  }
  previous() {
    if (this.state.animating) return;
    const previus = this.state.activeIndex === 0 ? carouselItems.length - 1 : this.state.activeIndex - 1;
    this.setState({
      activeIndex: previus,
    });
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
                <img className="app-image-fit-contain" src={carouselItems[0].src} alt={carouselItems[0].alt} />
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
            <div className="app-section-content">
              <div className="app-content-middle">
                <img className="app-image-fit-contain" src={carouselItems[1].src} alt={carouselItems[1].alt} />
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
            </div>
            <div className="app-section-title">Giới thiệu</div>
            <div className="app-section-content">
              <div className="app-content-middle">
                <img className="app-image-fit-contain" src={carouselItems[2].src} alt={carouselItems[2].alt} />
              </div>
              <div className="app-content-right" style={{ width: '35%' }}>
                <div className="app-content-title">{this.state.data?.name}</div>
                <div className="app-content-body">
                  <div className="app-content-wrap">Địa chỉ: {this.state.data?.address}</div>
                  <div className="app-content-wrap">Mô tả: {this.state.data?.description}</div>
                  <div className="app-content-wrap">Loại nông trại: {this.state.data?.farm_type?.name}</div>
                  <div className="app-content-wrap">Chủ nông trại: {this.state.data?.farmer?.first_name} {this.state.data?.farmer?.last_name}</div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

const carouselItems = [
  {
    src: "https://phanbonnhapkhau.com/wp-content/uploads/2017/06/untitled-design-2.png",
    alt: '',
  },
  {
    src: 'https://images.baodantoc.vn/uploads/2020/Th%C3%A1ng_11/Ng%C3%A0y_25/MH/chuoi3%203.jpg',
    alt: '',
  },
  {
    src: 'https://st.nhipcaudautu.vn/staticFile/Subject/2016/07/08/490_kd_chuoitiphu_7054807-sonpham_81811444.jpg',
    alt: '',
  },
];
