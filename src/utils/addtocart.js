const GTM_ID = 'GTM-MWZ4Z6R';

const resetGTMDataLayer = () => {
  if (window.dataLayer !== undefined && window.google_tag_manager !== undefined) {
    window.dataLayer.length = 0;
    window.google_tag_manager[GTM_ID]?.dataLayer?.reset();
  }
};

function addToCartEvent(farm_name, harvest_name, product_name, weight) {
  resetGTMDataLayer();
  const eventObj = { event: 'addToCart', farmname: farm_name, harvestname: harvest_name, productname: product_name, weight: weight };
  return window.dataLayer.push(eventObj);
}

export default addToCartEvent;
