import React,{ useEffect, useState } from 'react';
import './App.scss';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom'
import Homepage from './pages/homepage/homepage';
import Login from './pages/Login/Login';
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
import Home from './pages/home/home';
import MarketerNotification from './pages/marketer/notification/Notification';
import Tickets from './pages/marketer/tickets/Tickets';
import Adcodes from './pages/marketer/adcode/Adcodes';
import SMM from './pages/dashboard/SMM/SMM';
import PublisherAdcode from './pages/publisher-dashboard/adcodes/Adcodes';
import CreateBanner from './pages/marketer/createBanner/createBanner';
import MarketerProfile from './pages/marketer/profile/profile';
import Withdraw from './pages/publisher-dashboard/withdraw/withdraw';
import AdminPreview from './pages/admin/preview/AdminPreview';
import PublisherProfile from './pages/publisher-dashboard/pb-profile/PublisherProfile';
import PublisherEditProfile from './pages/publisher-dashboard/editprofile/PublisherEditProfile';
import PublisherSupport from './pages/publisher-dashboard/pb-support/publisherSupport';
import PublisherNotifications from './pages/publisher-dashboard/notifications/PublisherNotifications';
import EditProfile from './pages/dashboard/edit-profile/EditProfile';
import AdvertiserNotifications from './pages/dashboard/notifications/notifications';
import MarketerEditProfile from './pages/marketer/edit-profile/edit-profile';
import ForgetPassword from './pages/forgotPassword/ForgetPassword';
import ResetPassword from './pages/resetpassword/Resetpassword';
import Advertisers from './pages/admin/allAdvertisers/advertisers';
import AllPublishers from './pages/admin/publishers/publishers';
import AllMarketer from './pages/admin/markteter/marketer';
import AdvertiserPreview from './pages/admin/advertiserPreview/advertiserPreview';

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
  const history = useHistory();
  const token = localStorage.getItem("auth_token");
  const currentID = localStorage.getItem("targetId");
  const role = localStorage.getItem("auth_role");

  useEffect(() => {
    document.addEventListener("scroll", () => {
      const backgroundcolor = window.scrollY < 150 ? "transparent" : "#FFFAEB";
      setNavBackground(backgroundcolor);
    });
  },[])

  return (
    <div className="App">
      <Switch>
        <Route exact path='/' render={() => <Homepage navBackground={navBackground}/>} />
        {/* <Route exact path='/login' render={() => (token && role) ? (<Redirect to={`/dashboard/${role}`}/>) : (<Login/>)} /> */}
        <Route exact path='/login' render={() => <Login navBackground={navBackground}/>} />
        <Route exact path='/home' render={() => <Home navBackground={navBackground}/> }/>
        <Route exact path='/register' render={() => <Register navBackground={navBackground}/> }/>
        <Route exact path='/user-registration' render={() => <UserRegistration navBackground={navBackground}/> }/>
        <Route path='/dashboard/advertiser' render={() => <Dashboard/>  }/>
        <Route exact path='/create-ads' render={() => <CreateAds /> }/>
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
        <Route exact path='/dashboard/publisher' render={() => <PublisherDashboard/> }/>
        <Route exact path='/publisher-payment-history' component={PublisherPaymentHistory}/>
        <Route exact path='/publisher-ads-history' component={PublisherAdHistory}/>
        <Route exact path='/publisher-form' component={PublisherForm}/>
        <Route exact path='/admin' component={Admin}/>
        <Route exact path='/add-staff' component={AddStaff}/>
        <Route exact path='/new-ads-ticket' component={AdsTicket}/>
        <Route exact path='/notification' component={Notifications}/>
        <Route exact path='/email-verification' render={() => <EmailVerification navBackground={navBackground}/>}/>
        <Route exact path='/account-type' render={() => <AccountType navBackground={navBackground}/>}/>
        <Route exact path='/admin-registration' render={() => <AdminRegistation navBackground={navBackground}/>}/>
        <Route exact path='/admin-login' render={() => <AdminLogin navBackground={navBackground}/>}/>
        <Route exact path='/marketer/dashboard' component={MarketerDashboard}/>
        <Route path={`/marketer/preview-advert`} component={MarketerPreview}/>
        <Route path={`/admin/preview`} component={AdminPreview}/>
        <Route exact path='/marketer/notification/' component={MarketerNotification}/>
        <Route path='/admin/message' component={Message}/>
        <Route path='/admin/profile' component={AdminProfile}/>
        <Route path='/about' render={() => <About navBackground={navBackground}/>} />
        <Route path='/contact' render={() => <Contact navBackground={navBackground}/>}/>
        <Route exact path='/forget-password' render={() => <ForgetPassword navBackground={navBackground}/>}/>
        <Route exact path='/reset-password' render={() => <ResetPassword navBackground={navBackground}/>}/>
        <Route path='/new-budget' component={AddBudget}/>
        <Route path='/new-graphic' component={AddGraphic}/>
        <Route exact path='/marketer/tickets' component={Tickets}/>
        <Route exact path='/create-adcode' component={Adcodes}/>
        <Route exact path='/smm' component={SMM}/>
        <Route exact path='/publisher/adcode' component={PublisherAdcode}/>
        <Route exact path='/create-banner' component={CreateBanner}/>
        <Route exact path='/marketer/profile' component={MarketerProfile}/>
        <Route exact path='/publisher/withdraw' component={Withdraw}/>
        <Route exact path='/publisher/profile' component={PublisherProfile}/>
        <Route exact path='/publisher/edit-profile' component={PublisherEditProfile}/>
        <Route exact path='/publisher/support' component={PublisherSupport}/>
        <Route exact path='/publisher/notifications' component={PublisherNotifications}/>
        <Route exact path='/advertiser/edit-profile' component={EditProfile}/>
        <Route exact path='/advertiser/notifications' component={AdvertiserNotifications}/>
        <Route exact path='/marketer/edit-profile' component={MarketerEditProfile}/>
        <Route exact path='/admin/advertisers' component={Advertisers}/>
        <Route exact path='/admin/publisher' component={AllPublishers}/>
        <Route exact path='/admin/marketer' component={AllMarketer}/>
        <Route exact path='/admin/advertiser/preview' component={AdvertiserPreview}/>
      </Switch>
    </div>
  );
}

export default App;
