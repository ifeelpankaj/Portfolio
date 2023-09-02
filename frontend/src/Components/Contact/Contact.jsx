import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";
import { toast } from "react-hot-toast";
import { Button } from "@chakra-ui/react";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm();

  const sendBtn = useRef(null);
  // const loading = useRef(null);

  const onSubmit = async (data) => {
    // Destrcture data object
    const { name, email,  message } = data;
    sendBtn.current.disabled = true;

    try {
      const templateParams = {
        name,
        email,
        message,
      };
      await emailjs.send(
        "service_vfug7fd",
        "template_cy2u8om",
        templateParams,
        "_j_YNay8dVR9LELgB"
      );

      reset();
      toast.success("Thank You !!!");
      sendBtn.current.disabled = false;
    } catch (e) {
    toast.error("Oops server is busy!!!")
    sendBtn.current.disabled = false;
    
    }
  };

  return (
    <section id="contact">
      <motion.form
        initial={{
          x: "-100vw",
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        transition={{ delay: 0.2 }}
        id="contact-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h2>Contact Us</h2>
        <input
          type="text"
          name="name"
          {...register("name", {
            required: { value: true, message: "Please enter your name" },
            maxLength: {
              value: 30,
              message: "Please use 30 characters or less",
            },
          })}
          className="form-control formInput"
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          {...register("email", {
            required: true,
            pattern:
              /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          })}
          className="form-control formInput"
          placeholder="Email address"
        />

        <textarea
          name="message"
          {...register("message", {
            required: true,
          })}
          className="form-control formInput"
          placeholder="Message..."
          cols="30"
          rows="10"
        ></textarea>

        <Button ref={sendBtn}  type="submit">Send</Button>
      </motion.form>

      <motion.div
        className="formBorder"
        initial={{
          x: "100vw",
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          initial={{
            y: "-100vh",
            x: "50%",
            opacity: 0,
          }}
          animate={{
            x: "50%",
            y: "-50%",
            opacity: 1,
          }}
          transition={{
            delay: 1,
          }}
        >
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
