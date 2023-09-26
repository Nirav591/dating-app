import React, { useEffect, useState } from 'react';
import { Input, Button, Space, Switch, notification } from 'antd';
import { Formik, Field, Form } from 'formik';
import { updateGoogleAdsById } from '../store/google-ads/update-google-ads';
import { getGoogleAds } from '../store/google-ads/fetch-google-ads';
import { addGoogleAd } from '../store/google-ads/add-google-ads';


function GoogleAdsList() {
  const [newData, setNewData] = useState([]);
  const googleAd = newData[0];
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement, message) => {
    api.info({ message, placement });
  };

  const addCallBack = (response) => {
    if (response.message === 'Google ads added successfully') {
      openNotification('topRight', 'Google Ads updated successfully!');
    } else {
      openNotification('topRight', 'Fail to update Google ads!');
    }
  };

  const onFinish = async (values) => {
    if (googleAd) {
      await updateGoogleAdsById({ googleAds: values}, callback);
    } else {
      await addGoogleAd({ googleAds: values }, addCallBack);
    }
  };

  const callback = (response) => {
    if (response.message === 'Google ads updated successfully!') {
      openNotification('topRight', 'Google Ads updated successfully!');
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
    await getGoogleAds(callBack);
  };
  
  const initialValues ={
    googleAds: {
      app_open: googleAd?.app_open || '',
      app_open_status: googleAd?.app_open_status === 'true' || false,
      adaptive_banner: googleAd?.adaptive_banner || '',
      adaptive_banner_status: googleAd?.adaptive_banner_status === 'true' || false,
      interstitial: googleAd?.interstitial || '',
      interstitial_status: googleAd?.interstitial_status === 'true' || false,      
      interstitial_video: googleAd?.interstitial_video || '',
      interstitial_video_status: googleAd?.interstitial_video_status === 'true' || false,
      rewarded: googleAd?.rewarded || '',
      rewarded_status: googleAd?.rewarded_status === 'true' || false,
      rewarded_interstitial: googleAd?.rewarded_interstitial || '',
      rewarded_interstitial_status: googleAd?.rewarded_interstitial_status === 'true' || false,
      native_advanced: googleAd?.native_advanced || '',
      native_advanced_status: googleAd?.native_advanced_status === 'true' || false,
      native_advanced_video: googleAd?.native_advanced_video || '',
      native_advanced_video_status: googleAd?.native_advanced_video_status === 'true' || false,
      google_ads_status: googleAd?.google_ads_status === 'true' || false,
    } 
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
      Google Ads
      </Space>
      
      <div>
            <label htmlFor="googleAds.app_open">App Open :</label>
            <Field
              type="text"
              name="googleAds.app_open"
              as={Input}
              placeholder="App Open"
              style={{marginTop:5, marginBottom:10}}
            />
          </div>
          <div>
            <Field
              type="checkbox"
              name="googleAds.app_open_status"
              as={Switch}
              style={swithStyle}
              onChange={(value)=>formik.setFieldValue('googleAds.app_open_status',value)}
            />
          </div>

          <div>
            <label htmlFor="googleAds.adaptive_banner">Adaptive Banner :</label>
            <Field
              type="text"
              name="googleAds.adaptive_banner"
              as={Input}
              placeholder="Adaptive Banner"
              style={{marginTop:5, marginBottom:10}}
            />
          </div>    

          <div>
            <Field
              type="checkbox"
              name="googleAds.adaptive_banner_status"
              as={Switch}
              style={swithStyle}
              onChange={(value)=>formik.setFieldValue('googleAds.adaptive_banner_status',value)}
            />
          </div>

          <div>
            <label htmlFor="googleAds.interstitial">Interstitial :</label>
            <Field
              type="text"
              name="googleAds.interstitial"
              as={Input}
              placeholder="Interstitial"
              style={{marginTop:5, marginBottom:10}}
            />
          </div>    

          <div>
            <Field
              type="checkbox"
              name="googleAds.interstitial_status"
              as={Switch}
              style={swithStyle}
              onChange={(value)=>formik.setFieldValue('googleAds.interstitial_status',value)}
            />
          </div>
         
          <div>
            <label htmlFor="googleAds.interstitial_video">Interstitial Video :</label>
            <Field
              type="text"
              name="googleAds.interstitial_video"
              as={Input}
              placeholder="Interstitial Video"
              style={{marginTop:5, marginBottom:10}}
            />
          </div>    

          <div>
            <Field
              type="checkbox"
              name="googleAds.interstitial_video_status"
              as={Switch}
              style={swithStyle}
              onChange={(value)=>formik.setFieldValue('googleAds.interstitial_video_status',value)}
            />
          </div>
          <div>
            <label htmlFor="googleAds.rewarded">Rewarded :</label>
            <Field
              type="text"
              name="googleAds.rewarded"
              as={Input}
              placeholder="Rewarded"
              style={{marginTop:5, marginBottom:10}}
            />
          </div>    

          <div>
            <Field
              type="checkbox"
              name="googleAds.rewarded_status"
              as={Switch}
              style={swithStyle}
              onChange={(value)=>formik.setFieldValue('googleAds.rewarded_status',value)}
            />
          </div>       
          <div>
            <label htmlFor="googleAds.rewarded_interstitial">Rewarded Interstitial :</label>
            <Field
              type="text"
              name="googleAds.rewarded_interstitial"
              as={Input}
              placeholder="Rewarded Interstitial"
              style={{marginTop:5, marginBottom:10}}
            />
          </div>    

          <div>
            <Field
              type="checkbox"
              name="googleAds.rewarded_interstitial_status"
              as={Switch}
              style={swithStyle}
              onChange={(value)=>formik.setFieldValue('googleAds.rewarded_interstitial_status',value)}
            />
          </div>
          <div>
            <label htmlFor="googleAds.native_advanced">Native Advanced :</label>
            <Field
              type="text"
              name="googleAds.native_advanced"
              as={Input}
              placeholder="Native Advanced"
              style={{marginTop:5, marginBottom:10}}
            />
          </div>    

          <div>
            <Field
              type="checkbox"
              name="googleAds.native_advanced_status"
              as={Switch}
              style={swithStyle}
              onChange={(value)=>formik.setFieldValue('googleAds.native_advanced_status',value)}
            />
          </div>
          <div>
            <label htmlFor="googleAds.native_advanced_video">Native Advanced Video :</label>
            <Field
              type="text"
              name="googleAds.native_advanced_video"
              as={Input}
              placeholder="Native Advanced Video"
              style={{marginTop:5, marginBottom:10}}
            />
          </div>    

          <div>
            <Field
              type="checkbox"
              name="googleAds.native_advanced_video_status"
              as={Switch}
              style={swithStyle}
              onChange={(value)=>formik.setFieldValue('googleAds.native_advanced_video_status',value)}
            />
          </div>  

          <div>          
            <label htmlFor="googleAds.google_ads_status">Google Ads Status :</label>   
            <Field
              type="checkbox"
              name="googleAds.google_ads_status"
              as={Switch}
              style={{margin:20}}
              onChange={(value)=>formik.setFieldValue('googleAds.google_ads_status',value)}
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

export default GoogleAdsList;