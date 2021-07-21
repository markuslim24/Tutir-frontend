import React, { useEffect } from "react";
import { getUser } from "../store/slice/auth";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { client } from "../util/util";
import { updateUser } from "../store/slice/auth";

const LoadingPage = () => {
  const router = useRouter();

  useEffect(() => {
    const intervalId = setInterval(function () {
      checkUserStripeConnected();
    }, 500);
    setTimeout(() => {
      router.push("/profile");
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  // useEffect(() => {
  //   checkUserStripeConnected();
  // }, []);

  const checkUserStripeConnected = async () => {
    await client.get(`/user`).then((res) => {
      const user = res.data.payload;
      if (user.stripeConnected) {
        updateUser(user);
        router.push("/profile");
      } else {
        console.log("stripe not connected");
      }
    });
  };

  return <div></div>;
};

export default LoadingPage;
