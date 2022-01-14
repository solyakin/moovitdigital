import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import '../../dashboard/dashboard.scss';
import '../../../pages/marketer/preview/preview.scss';
import AdminTags from '../../../components/adminTags/adminTags';
import swal from 'sweetalert';
import logo from '../../../assets/image 1.png';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../allAdvertisers/advertiser.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdvertiserPreview = (props) => {

    const [isLoading, setLoading] = useState(false);
    const [fbData, setfbData] = useState([]);
    const [linkedinData, setLinkedinData] = useState([]);

    const [adsList, setAdsList] = useState([]);
    const [users, setUsers] = useState([]);
    const [banner, setBanner] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [publisherAds, setPublisherAds] = useState([]);
    const [notification, setNotification] = useState([]);
    const ticketData = JSON.parse(localStorage.getItem("targetData"));
    const token = localStorage.getItem("auth_token");
    const auth_id = localStorage.getItem("auth_id");
    const tg_id = localStorage.getItem("tg_id");
    const authAxios = axios.create({
        baseURL : "https://test.canyousing.com.ng",
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    useEffect(() => {
        const fetchingData = async() => {
            const allUsers = await authAxios.get('/api/admin/users')
            const users_data = allUsers.data
            setUsers(users_data.data.data);

            const allNotifications = await authAxios.get('/api/admin/notifications');
            const notification_array = allNotifications.data;
            setNotification(notification_array.data);

            const publisherads = await authAxios.get('api/admin/all-script')
            const pub_res = publisherads.data;
            setPublisherAds(pub_res.data)

            const banners = await authAxios.get('/api/admin/all-banners')
            const res = banners.data;
            setBanner(res.data)

            const allPublishers = await authAxios.get('/api/admin/publisher');
            const result = allPublishers.data;
            const pubData = result.data;
            setPublishers(pubData);

            const linkedinAds = await authAxios.get('/api/linkedin');
            const results = linkedinAds.data;
            setLinkedinData(results.elements)

            authAxios.get('/api/admin/ads')
                .then(response => {
                if(response.status == 200){
                    const data = response.data;
                    const adsListData = data.data.data;
                    setAdsList(adsListData)
                }
            })
        }
        fetchingData()
    }, [])

    const FB_AdsList = props.adsList;
    let insightData = [];
    FB_AdsList.map(item => {
        if(item.insights){
            const ADinsights = item;
            insightData.push(ADinsights);
        }
    })

    const exportPdf = (e) => {
        var doc= new jsPDF();
        doc.autoTable({ html: '#my-table' })
        doc.save('campaigns.pdf')
    }

    const exportPdf_fb = (e) => {
        var doc= new jsPDF();
        doc.autoTable({ html: '#table-fb' })
        doc.save('facebook.pdf')
    }
    const exportPdf_lkd = (e) => {
        var doc= new jsPDF();
        doc.autoTable({ html: '#table-linkedin' })
        doc.save('linkedin.pdf')
    }
    const newPublisherArrray = Object.values(publishers);
    const userScript = publisherAds.filter(item => item.user_id == tg_id)
    console.log(banner)
    console.log(publisherAds)
    return (
        <div className="dashboard marketer-preview preview">
            <div className="small-title">
                <div className="title-text justify-content-between">
                    <div className="logo">
                        <Link to='/home'>
                            <img src={logo} alt="moovit-logo" />
                        </Link>
                    </div>
                    <div className="text d-flex align center">
    
                    </div>
                </div>
                <div className="dashboard-main-wrapper">
                    <div className="tabs">
                        <AdminTags notification={notification}/>
                    </div>
                    <div className="dashboard-main">
                        <div className="preview-content">
                            <div className="main-heading">
                                <div className="welcome">
                                    <h4>Advertiser details</h4>
                                </div>
                                <div className="smm">
                                
                                </div>
                            </div>
                            <div className="preview-wrapper">
                                {
                                    users.filter(item => item.id == tg_id)
                                    .map(({id, firstName, lastName, email, phone, company, business_type, business_duration, business_bio}) => {
                                        return (
                                            <div className="prev-container" key={id}>
                                                <div className="ads-detail">
                                                    <div className="title mb-4">
                                                        <h5>Name</h5>
                                                        <p>{`${firstName} ${lastName}`}</p>
                                                    </div>
                                                    <div className="descritpion mb-4">
                                                        <h5>Business Bio</h5>
                                                        <p>{business_bio}. </p>
                                                    </div>
                                                    <div className="budget mb-4">
                                                        <h5>Company</h5>
                                                        <p>{company}</p>
                                                    </div>
                                                    <div className="dates mb-4">
                                                        <div className="start">
                                                            <h5>Business Size</h5>
                                                            <p>{business_type}</p>
                                                        </div>
                                                        <div className="end">
                                                            <h5>Business Turnover</h5>
                                                            <p>{business_duration}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="sender">
                                                    <div className="sender-profile">
                                                        <h5>Contact</h5>
                                                        <p className="email">{email}</p>
                                                        <p>{phone}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>   
                            
                            
                            <div className="all-ads">
                                <h4>Publisher Advert</h4>
                                <div className="history-table mb-5">
                                    <table className="table admin-view" id="my-table">
                                        <thead>
                                            <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Campaign Name</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Location</th>
                                            <th scope="col">Bugdet</th>
                                            <th scope="col">Impressions</th>
                                            <th scope="col">Clicks</th>
                                            <th scope="col">Publisher</th>
                                            <th scope="col">status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                userScript.map(({id, user_id, impressions, clicks, banner_id, publisher_id,advert_id}) => {
                                                    const ads_id = advert_id
                                                    const ban_id = banner_id;
                                                    const targetBanner = banner.filter(item => item.user_id == user_id)
                                                    const newPublisher = newPublisherArrray.filter(item => item.id == publisher_id)

                                                    let publisherName = "";
                                                    newPublisher.map(({company}) => {
                                                        publisherName = company
                                                    })
                                                    console.log(targetBanner);
                                                    let title = '';
                                                    let content_data = "";
                                                    let location_data = "";
                                                    let budget_data = "";
                                                    let status = ""
                                                    targetBanner.map(({id, name, advert_id}) => {
                                                        console.log(id)
                                                        if(id == ban_id){
                                                            title = name;
                                                        }  
                                                    })
                                                    adsList.map(({id, title, content, location, budget_id, active, approved}) => {
                                                        if(ads_id == id){
                                                            content_data = content;
                                                            location_data = location;
                                                            if(budget_id == 1){
                                                                budget_data = "#10,000"
                                                            }else if(budget_id == 2){
                                                                budget_data = "#50,000"
                                                            }else if(budget_id = 3){
                                                                budget_data = "#100,000"
                                                            }
                                                            if(approved == 1){
                                                                status = "Running"
                                                            }else if(approved == 2){
                                                                status = "Approved"
                                                            }
                                                            else{
                                                                status = "Not Approved"
                                                            }
                                                        }
                                                    })
                                                    return(
                                                        <tr key={id} id={id}>
                                                        <th scope="row text-left">
                                                            <input type="checkbox" name="" id="" />
                                                        </th>
                                                        <td>{title}</td>
                                                        {/* <td>Publisher</td> */}
                                                        <td>{content_data}</td>
                                                        <td>{location_data}</td>
                                                        <td>{budget_data}</td>
                                                        <td className="text-center">{impressions}</td>
                                                        <td>{clicks}</td>
                                                        <td>{publisherName}</td>
                                                        <td>{status}</td>
                                                    </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="row mb-4 text-center justify-content-center">
                                    <div className="col-lg-4">
                                        <button className='export_btn' style={{padding : "7px 20px", width: "100%", borderRadius:"5px", marginBottom : "2rem"}} onClick={exportPdf}>Export Pdf</button>
                                    </div>
                                </div>
                                <h4>Social Media</h4>
                                <div className="history-table">
                                    <h4 className="text-center">Facebook Ads</h4>
                                    <table className="table table-striped" id="table-fb">
                                        <thead>
                                            <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Campaign</th>
                                            <th scope="col">Likes</th>
                                            <th scope="col">Impressions</th>
                                            <th scope="col">Clicks</th>
                                            <th scope="col">Spent</th>
                                            <th scope="col">Post Engagement</th>
                                            <th scope="col">Video View</th>
                                            <th scope="col">Page Engagement</th>
                                            <th scope="col">Post Reaction</th>
                                            {/* <th scope="col">Start Date</th> */}
                                            <th scope="col">Status</th>
                                            {/* <th scope="col">End Date</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {                 
                                            insightData.map(item => {
                                                
                                                const itemData = item.insights.data;
                                                let clickAction = "";
                                                let likeAction = "";
                                                let videoView = "";
                                                let engagementAction = "";
                                                let postReaction = "";
                                                let pageAction = "";

                                                itemData.map(({actions}) => {
                                                    actions.map(item => {
                                                        if(item.action_type == "link_click"){
                                                            clickAction = item;
                                                        }else if(item.action_type == "like"){
                                                            likeAction = item;
                                                        }else if(item.action_type == "video_view"){
                                                            videoView = item;
                                                        }else if(item.action_type == "post_reaction"){
                                                            postReaction = item;
                                                        }else if(item.action_type == "post_engagement"){
                                                            engagementAction = item;
                                                        }else if(item.action_type == "page_engagement"){
                                                            pageAction = item;
                                                        }
                                                    })
                                                })

                                                const TotalpostReaction = Number(postReaction.value);
                                                const TotalengagementAction = Number(engagementAction.value);
                                                const TotalpageAction = Number(pageAction.value);
                                                const TotalvideoView = Number(videoView.value);
                                                const TotalClicks = Number(clickAction.value);
                                                const TotalLikes = Number(likeAction.value);
                                                
                                                return (
                                                    <tr key={item.id} id={item.id}>
                                                        <th scope="row text-left">
                                                            <input type="checkbox" name="" id="" />
                                                        </th>
                                                        <td>{item.name}</td>
                                                        <td>{(!TotalLikes) ? "-" : TotalLikes }</td>
                                                        <td className='text-center'>{itemData[0].impressions}</td>
                                                        <td>{(!TotalClicks) ? "-" : TotalClicks }</td>
                                                        <td>{itemData[0].spend}</td>
                                                        <td className='text-center'>{(!TotalengagementAction) ? "-" : TotalengagementAction}</td>
                                                        <td className='text-center'>{(!TotalvideoView) ? "-" : TotalvideoView}</td>
                                                        <td className='text-center'>{TotalpageAction}</td>
                                                        <td className='text-center'>{TotalpostReaction}</td>
                                                        {/* <td>{itemData[0].date_start}</td> */}
                                                        <td>Running</td>
                                                        {/* <td>{itemData[0].date_stop}</td> */}
                                                        {/* <td><p className="view-detail" onClick={modalClick} id={item.id}>view details</p></td> */}
                                                    </tr>
                                                )
                                            })
                                            }
                                        </tbody>
                                        </table>
                                        <div className="row justify-content-center">
                                            <div className="col-lg-4">
                                                <button style={{padding : "7px 20px", width: "100%", borderRadius:"5px", marginBottom : "2rem", marginTop : "3rem"}} onClick={exportPdf_fb}>Export Pdf</button>
                                            </div>
                                        </div>
                                    </div>
                                    <h4 className="text-center">LinkedIn Ads</h4>
                                    <div className="history-table">
                                        <table className="table table-striped" id="table-linkedin">
                                            <thead>
                                                <tr>
                                                    <th scope="col"></th>
                                                    <th scope="col">Campaign</th>
                                                    <th scope="col">Campaign Type</th>
                                                    <th scope="col">Impressions</th>
                                                    <th scope="col">Click</th>
                                                    <th scope="col">Likes</th>
                                                    <th scope="col">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {                 
                                                    linkedinData.map((item, index) => {
                                                        
                                                        const array_list = item.variables.data;
                                                        const newItem = Object.values(array_list)
                                                        console.log(newItem)
                                                        let titleText = "";
                                                        let textVal = "";
                                                        newItem.map(({title, text}) => {
                                                            titleText = title;
                                                            textVal = text;
                                                        })
                                                        console.log(titleText)
                                                        return(
                                                            <tr key={index}>
                                                                <th scope="row text-left">
                                                                    <input type="checkbox" name="" id="" />
                                                                </th>
                                                                <td>{titleText}</td>
                                                                <td>{textVal}</td>
                                                                <td className='text-center'>0</td>
                                                                <td>0</td>
                                                                <td>0</td>
                                                                <td>-</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                        <div className="row justify-content-center">
                                            <div className="col-lg-4">
                                                <button style={{padding : "7px 20px", width: "100%", borderRadius:"5px", marginBottom : "2rem", marginTop : "3rem"}} onClick={exportPdf_lkd}>Export Pdf</button>
                                            </div>
                                        </div>
                                    </div>
                            </div> 
                        </div>
                    </div>  
                </div>  
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return{
        adsList : state.ads
    }
}
export default connect(mapStateToProps) (AdvertiserPreview);

