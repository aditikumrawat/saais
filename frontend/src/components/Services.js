import React from 'react'
import Service from '../components/Service'
import img1 from "../images/img1.png"
import img2 from "../images/img2.png"
import img3 from "../images/img3.png"
import img4 from "../images/img4.png"
import img5 from "../images/img5.png"
import '../css/Services.css'

const Services = () => {
  const services = [
    {
      id: 1,
      img: img1,
      head: "AI-Powered Business Advisor",
      descp: "Our AI-powered Business Advisory Chatbot is your virtual business consultant, available 24/7 to provide expert guidance and solutions tailored to your small business. Whether you have questions about marketing, finance, or operations, our chatbot powered by advanced GPT technology is here to assist you. Get actionable advice to make informed decisions and drive your business forward."
    },
    {
      id: 2,
      head: "Market Research Insights",
      img: img2,
      descp: "Unlock the power of data with our Market Research Insights service. We harness the capabilities of AI to analyze market trends, competitor strategies, and consumer behavior, providing you with valuable insights to stay ahead in your industry. Make data-driven decisions, discover growth opportunities, and understand your market like never before."
    },
    {
      id: 3,
      head: "Legal & Compliance Assistance",
      img: img3,
      descp: "Navigating the legal and compliance landscape is easier with our Legal & Compliance Navigator. Our platform combines a comprehensive knowledge base with AI-driven responses to address your legal and compliance queries. Ensure that your business operations are compliant with the latest regulations and best practices."
    },
    {
      id: 4,
      head: "Business Essentials Procurement",
      img: img4,
      descp: "Running a small business often means sourcing the right Business Essentials efficiently and cost-effectively. Our Business Essentials Marketplace is designed to simplify the procurement process for you. Browse through a wide range of quality essentials, connect with trusted suppliers, and streamline your supply chain effortlessly."
    },
    {
      id: 5,
      head: "Customized Business Essential Bundles",
      img: img5,
      descp: "Boost your business's efficiency with our Customized Business Essential Bundles. We understand that every small business has unique needs. Create personalized bundles of business essentials that cater to your specific industry and operational requirements. Save time and money with hassle-free bundling."
    }
  ];
  return (
    <div className='services'>
        <div className='services-head'>
            <div className='services-heading'>Services</div>
            <div className='services-div'>
              {services.map((service)=>{
                return <Service key={service.id} service={service}/>
              })}
            </div>
        </div>
    </div>
  )
}

export default Services