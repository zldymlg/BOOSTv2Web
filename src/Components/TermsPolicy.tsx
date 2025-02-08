import React from "react";
import { motion } from "framer-motion";

const TermsPolicy = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div
      className="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="terms-box"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <h2>Terms of Use & Privacy Policy</h2>
        <p>
          These are the terms and conditions that you must agree to before using
          our platform...
        </p>
        <p>
          We collect user data to improve services but do not share information
          without consent.
        </p>
        <button onClick={onClose} className="close-btn">
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};

export default TermsPolicy;
