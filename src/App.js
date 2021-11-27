import React,{ useEffect, useState } from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom'
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Homepage from './pages/homepage/homepage';
import Login from './pages/Login/Login';
import SignUp from './pages/signUp/signUp';
import UserRegistration from './pages/userReg/userReg';  
import Dashboard from './pages/dashboard/dashboard';
import CreateAds from './pages/dashboard/createAds/createAds';
import Pricing from './pages/dashboard/pricing/pricing';
import Call from './pages/dashboard/call/call';
import Review from './pages/dashboard/review/review';
import Approved from './pages/dashboard/approved/approved';
import AdHistory from './pages/dashboard/ads-history/ads.history';
import PaymentHistory from './pages/dashboard/payment-history/payment-history';
import Profile from './pages/dashboard/profile/profile';
import Support from './pages/dashboard/support/support';
import axios from 'axios';
import Payment from './pages/dashboard/payment/payment';
import PublisherDashboard from './pages/publisher-dashboard/pb-dashboard/pb-dashboard';
import PublisherPaymentHistory from './pages/publisher-dashboard/pb-payment/pb-payment';
import PublisherAdHistory from './pages/publisher-dashboard/pb-adsHistory/pb-adsHistory';
import PublisherForm from './pages/publisher-form/publisher-form';
import Admin from './pages/admin/admin';
import AddStaff from './pages/admin/add-staff/add-staff';
import AdsTicket from './pages/admin/ads-ticket/ads-ticket';
import Notifications from './pages/admin/notifications/notifications';
import Register from './pages/register/register';
import EmailVerification from './pages/email-verification/email.verification';
import AccountType from './pages/accountType/accountType';
import AdminRegistation from './pages/admin/admin-registration/admin-registration';
import AdminLogin from './pages/admin/admin-login/admin-login';
import MarketerDashboard from './pages/marketer/dashboard/dashboard';
import MarketerPreview from './pages/marketer/preview/preview';
import Message from './pages/admin/messages/messages';
import AdminProfile from './pages/admin/admin-profile/ad-profile';
import LoadingScreen from './components/loadingScreen/loadingScreen';
import About from './pages/aboutPage/about';
import Contact from './pages/contact/contact';
import AddBudget from './pages/admin/addBudget/addBudget';
import AddGraphic from './pages/admin/addGraphic/addGraphic';
import RunningAds from './pages/dashboard/ads-history/runningAds/runningAds';

// TODO
// 1. display user name on admin all-ads page
///call api and store value in redux espcially for fetch all ads on admin and ads list page
// fetch users id globally to use everywhere

// axios.defaults.baseURL = 'https://moovitdigital.com/api';
// axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.post['Accept'] = 'application/json';
// const token = localStorage.getItem("auth_token");
// axios.defaults.headers.common['Authorization'] = token;
function App() {

  const [navBackground, setNavBackground] = useState("transparent");
  const [users, setUsers] = useState([]);
  const [state, setState] = useState(true);

  const token = localStorage.getItem("auth_token");
  const authAxios = axios.create({
      baseURL : "https://api.moovitdigital.com",
      headers : {
          Authorization : `Bearer ${token}`
      }
  })

  const currentID = localStorage.getItem("targetId");

  useEffect(() => {
    document.addEventListener("scroll", () => {
      const backgroundcolor = window.scrollY < 500 ? "transparent" : "#FFFAEB";
      setNavBackground(backgroundcolor);
    });
  },[])

  return (
    <div className="App">
      {/* <Header navBackground={navBackground}/> */}
      <Switch>
        <Route exact path='/' render={() => <Homepage  />} />
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/sign-up' component={SignUp}/>
        <Route exact path='/user-registration' component={UserRegistration}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Route exact path='/create-ads' component={CreateAds}/>
        <Route exact path='/create-ads/pricing' component={Pricing}/>
        <Route exact path='/request-call' component={Call}/>
        <Route exact path='/review' component={Review}/>
        <Route exact path='/approved' component={Approved}/>
        <Route exact path='/ads-history' component={AdHistory}/>
        <Route exact path='/running-ads' component={RunningAds}/>
        <Route exact path='/payment-history' component={PaymentHistory}/>
        <Route exact path='/profile' component={Profile}/>
        <Route exact path='/support' component={Support}/>
        <Route exact path='/payment' component={Payment}/>
        <Route exact path='/publisher-dashboard' component={PublisherDashboard}/>
        <Route exact path='/publisher-payment-history' component={PublisherPaymentHistory}/>
        <Route exact path='/publisher-ads-history' component={PublisherAdHistory}/>
        <Route exact path='/publisher-form' component={PublisherForm}/>
        <Route exact path='/admin' component={Admin}/>
        <Route exact path='/add-staff' component={AddStaff}/>
        <Route exact path='/new-ads-ticket' component={AdsTicket}/>
        <Route exact path='/notification' component={Notifications}/>
        <Route exact path='/email-verification' component={EmailVerification}/>
        <Route exact path='/account-type' component={AccountType}/>
        <Route exact path='/admin-registration' component={AdminRegistation}/>
        <Route exact path='/admin-login' component={AdminLogin}/>
        <Route exact path='/marketer/dashboard' component={MarketerDashboard}/>
        <Route path={`/marketer/preview-advert/${currentID}`} component={MarketerPreview}/>
        <Route path='/admin/message' component={Message}/>
        <Route path='/admin/profile' component={AdminProfile}/>
        <Route path='/about' component={About}/>
        <Route path='/contact' component={Contact}/>
        <Route path='/new-budget' component={AddBudget}/>
        <Route path='/new-graphic' component={AddGraphic}/>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
