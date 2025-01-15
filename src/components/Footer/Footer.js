/** @format */

import React, { useState } from "react";
import { Divider } from "antd";
import { Icon } from "@iconify/react";
import { withTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { path } from "../../utils/constants";
import logoVNPAY from "../../assets/logo VNPAY-QR_bg_white.png";
const Footer = () => {
  const navigate = useNavigate();
  const policies = [
    { key: 1, label: "General policy" },
    { key: 2, label: "Information security policy" },
    { key: 3, label: "Complaint response policy" },
    { key: 4, label: "Payment policy" },
    { key: 5, label: "Refund policy" },
    { key: 6, label: "Online purchasing policy" },
  ];
  const contactInfo = [
    { label: "Email", value: "contact@aquaticshub.vn" },
    { label: "Aquatics", value: "0969685445" },
    { label: "Aqua cafe", value: "0949685445" },
  ];

  const businessInfo = ["Business License", "Business Qualification License"];

  return (
    <>
      <div className="h-auto w-full bg-black py-6">
        <div className="grid grid-cols-3 gap-6 w-[90%] mx-auto md:max-xl:grid-cols-2 max-md:grid-cols-1 ph:max-sm:grid-cols-1 pv:max-ph:grid-cols-1 pv:max-pvmax:grid-cols-1 pvmax:max-ph:grid-cols-1">
          {/* <div className="text-white w-full mx-auto flex flex-col gap-4 ">
            <div>
              <h3 className="font-bold text-xl mb-4 text-orange-400">Policies</h3>
              <ul className="grid grid-cols-2">
                {policies.map((policy) => (
                  <li key={policy.key} className="cursor-pointer hover:underline mb-2">
                    {policy.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4 justify-end ">
              <p className="font-bold text-xl text-orange-400">Service</p>
              <p className="cursor-pointer hover:underline">
                Course
              </p>
            </div>

            <div className="flex flex-col">
              <p className="font-bold text-xl mb-4 text-orange-400">Accept Payments</p>
              <div className="flex justify-start pv:max-ph:pb-12 ph:max-lg:pb-12">
                <img
                  className="h-16 sm:w-48 mt-1  -left-8 object-cover"
                  src={logoVNPAY}
                ></img>
              </div>
            </div>
          </div> */}

          <div className="text-white flex flex-col gap-4 w-full mx-auto">
            {/* <div className="">
              <p className="font-bold text-xl mb-4 text-orange-400">Swim Pool</p>
              <p className="">
                Swim Academy is passionate about sports and physical
                activity.Our school was created out of passion for water sports
                and personal development.
              </p>
            </div> */}
            <div className="flex gap-1 items-center">
              <p className="font-bold text-xl text-orange-400">Location</p>
            </div>
            <p className="">
              98 To Ngoc Van, Quang An Ward, Tay Ho District, Hanoi
            </p>


            <div className="text-white flex flex-col gap-4 w-full hidden md:max-xl:block">
            <div className="flex flex-col gap-1 ">
              <p className="font-bold text-xl text-start mb-4 text-orange-400">Contact</p>
              <p className="">Email : contact@aquaticshub.vn</p>
              <p className="">Aquatics : 0969685445</p>
              <p className="">Aqua cafe : 0949685445</p>
            </div>

            {/* <div className="flex flex-col gap-2 ">
              <p className="font-bold text-xl text-start text-orange-400">
                Business Registration
              </p>
              <p className="">Business License</p>
              <p className="">Business Qualification License</p>
            </div> */}
          </div>
          </div>

          <div className="text-white flex flex-col gap-4 w-full md:max-xl:hidden">
            <div className="flex flex-col gap-1 ">
              <p className="font-bold text-xl text-start mb-4 text-orange-400">Contact</p>
              <p className="">Email : contact@aquaticshub.vn</p>
              <p className="">Aquatics : 0969685445</p>
              <p className="">Aqua cafe : 0949685445</p>
            </div>

            {/* <div className="flex flex-col gap-2 ">
              <p className="font-bold text-xl text-start text-orange-400">
                Business Registration
              </p>
              <p className="">Business License</p>
              <p className="">Business Qualification License</p>
            </div> */}
          </div>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.146944107559!2d105.81925937387743!3d21.066792486473876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aafa14a5f107%3A0xfb112d523e036451!2zOTggxJAuIFTDtCBOZ-G7jWMgVsOibiwgUXXhuqNuZyBBbiwgVMOieSBI4buTLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1715311990382!5m2!1svi!2s"
            className="w-full h-full pv:max-xl:h-[300px]"
          ></iframe>
        </div>
        <Divider className="bg-white"></Divider>

        <div className=" flex justify-center">
          <p className="text-white">Copyright © {new Date().getFullYear()}</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
