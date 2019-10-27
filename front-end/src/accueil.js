import React, { Component } from 'react';
import styles from './App.module.css';
import cliniquephoto from "./assets/doctors-glass-hallway-127873.jpg";

export const accueil = () => (
  <div className = {styles['Main-page']}>
    <section id = "accueil">
      <h1>Welcome</h1>
      <p>The MHICC strives to conduct clinical trials efficiently and effectively through innocation in order to fulfill our customer needs</p>
    </section>
    <section id = "accueilabout">
      <h1>About the MHICC</h1>
      <p>he MHICC strives to conduct clinical trials efficiently and effectively through innocation in order to fulfill our customer needshe MHICC strives to conduct clinical trials efficiently and effectively through innocation in order to fulfill our customer needshe MHICC strives to conduct clinical trials efficiently and effectively through innocation in order to fulfill our customer needshe MHICC strives to conduct clinical trials efficiently and effectively through innocation in order to fulfill our customer needshe MHICC strives to conduct clinical trials efficiently and effectively through innocation in order to fulfill our customer needs</p>
    </section>
    <section id = "accueilhowitworks">
      <h1>How it works</h1>
      <h2>1- Find a study</h2>
      <p>he MHICC strives to conduct clinical trials efficiently and effectively through innocation in order to fulfill our customer needshe MHICC strives to conduct</p>
      <h2>2- Fill out an application form</h2>
      <p>he MHICC strives to conduct clinical trials efficiently and effectively through innocation in order to fulfill our customer needshe MHICC strives to conduct</p>
      <h2>3- Communicate with a health professionnal</h2>
      <p>he MHICC strives to conduct clinical trials efficiently and effectively through innocation in order to fulfill our customer needshe MHICC strives to conduct</p>
    </section>
    <section id = "accueilclinicalstudies">
      <h1>Clinical Studies</h1>
    </section>
  </div>
  )

/*  <script src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.slim.js"></script>
  <script src = "App.js"></script> */

//class accueil extends Component {
  //render() {
    //return (
      //<div>
        //Home page
      //</div>
    //)
  //}
//}
/*<BackgroundImage source={cliniquephoto} style={{width: '100%', height: '100%'}}>
<View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
  <Text>Centered text</Text>
</View>
</BackgroundImage>*/
//export default accueil;