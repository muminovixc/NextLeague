"use client";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import VipCard from "../../components/vip_cards/vip_cards";

export default function Vip() {

  return (
    <div >
      <VipCard />

    </div>
  )
}