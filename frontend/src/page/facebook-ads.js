import React, { useEffect, useState } from 'react';
import { Input, Button, Space, Switch, notification } from 'antd';
import { Formik, Field, Form } from 'formik';
import { updateFacebookAdsById } from '../store/facebook-ads/update-google-ads';
import { getFacebookAds } from '../store/facebook-ads/fetch-facebook-ads';
import { addFacebookAd } from '../store/facebook-ads/add-facebook-ads';


function FacebookAdsList() {
  const [newData, setNewData] = useState([]);
  const facebookAd = newData[0];
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement, message) => {
    api.info({ message, placement });
  };

  const addCallBack = (response) => {
    if (response.message === 'Facebook ads added successfully') {
      openNotification('topRight', 'Facebook Ads updated successfully!');
    } else {
      openNotification('topRight', 'Fail to update Facebook ads!');
    }
  };

  const onFinish = async (values) => {
    if (facebookAd) {
      await updateFacebookAdsById({ facebookAds: values}, callback);
    } else {
      await addFacebookAd({ facebookAds: values }, addCallBack);
    }
  };

  const callback = (response) => {
    if (response.message === 'Facebook ads updated successfully!') {
      openNotification('topRight', 'Facebook Ads updated successfully!');
    }
  };

  const swithStyle = {
    position: 'absolute',
    marginTop: '-25px',
    right: '25px',
    transform: 'translateY(-50%)',
  };

  const callBack = (response) => {
    const data = response;
    setNewData(data);
  };

  const addAndFetch = async () => {
    await getFacebookAds(callBack);
  };
  
  const initialValues ={
    facebookAds: {
      banner: facebookAd?.banner || '',
      banner_status: facebookAd?.banner_status === 'true' || false,
      interstitial: facebookAd?.interstitial || '',
      interstitial_status: facebookAd?.interstitial_status === 'true' || false,
      native_advanced: facebookAd?.native_advanced || '',
      native_advanced_status: facebookAd?.native_advanced_status === 'true' || false,
      native_banner: facebookAd?.native_banner || '',
      native_banner_status: facebookAd?.native_banner_status === 'true' || false,
      facebook_ads_status: facebookAd?.facebook_ads_status === 'true' || false,
    },
  }
  useEffect(() => {
    addAndFetch();
  }, []);

  return (
    <>
      {contextHolder}
      <Formik
        enableReinitialize={true}
        initialValues={
          initialValues
        }
        onSubmit={onFinish}
      >
      {(formik) => (
      <Form>
      <Space style={{ fontSize: '17px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        Facebook Ads
      </Space>
      
      <div>
          <label htmlFor="facebookAds.banner">Banner :</label>
          <Field
              type="text"
              name="facebookAds.banner"
              as={Input}
              placeholder="Banner"
              style={{marginTop:5, marginBottom:10}}
            />
          </div>

          <div>
            <Field
              type="checkbox"
              name="facebookAds.banner_status"
              as={Switch}
              style={swithStyle}
              onChange={(value)=>formik.setFieldValue('facebookAds.banner_status',value)}
            />
          </div>
          <div>
            <label htmlFor="facebookAds.interstitial">Interstitial :</label>
            <Field
              type="text"
              name="facebookAds.interstitial"
              as={Input}
              placeholder="Interstitial"
              style={{marginTop:5, marginBottom:10}}
            />
          </div>

          <div>
            <Field
              type="checkbox"
              name="facebookAds.interstitial_status"
              as={Switch}
              style={swithStyle}
              onChange={(value)=>formik.setFieldValue('facebookAds.interstitial_status',value)}
            />
          </div>
          <div>
            <label htmlFor="facebookAds.native_advanced">Native Advanced :</label>
            <Field
              type="text"
              name="facebookAds.native_advanced"
              as={Input}
              placeholder="Native Advanced"
              style={{marginTop:5, marginBottom:10}}
            />
          </div>

          <div>
            <Field
              type="checkbox"
              name="facebookAds.native_advanced_status"
              as={Switch}
              style={swithStyle}
              onChange={(value)=>formik.setFieldValue('facebookAds.native_advanced_status',value)}
            />
          </div>
          <div>
            <label htmlFor="facebookAds.native_banner">Native Banner :</label>
            <Field
              type="text"
              name="facebookAds.native_banner"
              as={Input}
              placeholder="Native Banner"
              style={{marginTop:5, marginBottom:10}}
            />
          </div>

          <div>
            <Field
              type="checkbox"
              name="facebookAds.native_banner_status"
              as={Switch}
              style={swithStyle}
              onChange={(value)=>formik.setFieldValue('facebookAds.native_banner_status',value)}
            />
          </div>
          <div>
            <label htmlFor="facebookAds.native_banner">Facebook Ads Status :</label>
            <Field
              type="checkbox"
              name="facebookAds.facebook_ads_status"
              as={Switch}
              style={{margin:20}}
              onChange={(value)=>formik.setFieldValue('facebookAds.facebook_ads_status',value)}
            />
          </div>
     
        <Button type="primary" htmlType="submit">
          Save
        </Button>
     
    </Form>
       )}
      </Formik>
    </>
  );
}

export default FacebookAdsList;