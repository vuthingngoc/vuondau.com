import React from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

import { Button } from "reactstrap";

import defaultImage from "assets/img/image_placeholder.jpg";
import defaultAvatar from "assets/img/placeholder.jpg";
import { convertImageToBase64 } from 'services/data.service';

function ImageUpload(props) {
  const [file, setFile] = React.useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(
    props.avatar ? defaultAvatar : defaultImage
  );
  const [imgBase64, setImgBase64] = React.useState('')
  const fileInput = React.useRef(null);
  const handleImageChange = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      let _convertImageToBase64 = convertImageToBase64(e.target.files[0]);
        Promise.all([_convertImageToBase64]).then(values => {
          setImgBase64(values[0]);
        })
    }
  };
  // const handleSubmit = e => {
  // e.preventDefault();
  // this.state.file is the file/image uploaded
  // in this function you can save the image (this.state.file) on form submit
  // you have to call it yourself
  // };
  const handleClick = () => {
    fileInput.current.click();
  };
  const handleRemove = () => {
    setFile(null);
    setImagePreviewUrl(props.avatar ? defaultAvatar : defaultImage);
    fileInput.current.value = null;
  };
  return (
    <div className="fileinput text-center">
      <input type="file" onChange={handleImageChange} ref={fileInput} />
      <div className={'thumbnail' + (props.avatar ? ' img-circle' : '')}>
        <img src={imgBase64} alt="..." width="300px" height="300px" />
      </div>
      <div>
        {file === null ? (
          <Button className="btn-round" color="default" outline onClick={handleClick}>
            {props.avatar ? 'Add Photo' : 'Select image'}
          </Button>
        ) : (
          <span>
            <Button className="btn-round" outline color="default" onClick={handleClick}>
              Change
            </Button>
            {props.avatar ? <br /> : null}
            <Button color="danger" className="btn-round btn-link" onClick={handleRemove}>
              <i className="fa fa-times" />
              Remove
            </Button>
          </span>
        )}
      </div>
    </div>
  );
}

ImageUpload.propTypes = {
  avatar: PropTypes.bool,
};

export default ImageUpload;
