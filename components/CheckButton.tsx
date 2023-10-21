import { motion, useMotionValue, useTransform } from 'framer-motion';
import React from 'react';

interface ICheckButtonProps {
  checked: boolean;
  handleCheck: () => void;
}

const checkVariants = {
  initial: {
    color: '#fff',
  },
  checked: { pathLength: 1 },
  unchecked: { pathLength: 0 },
};

const boxVariants = {
  checked: {
    background: 'var(--primaryPurple)',
    transition: { duration: 0.1 },
  },
  unchecked: { background: 'var(--gray-2)', transition: { duration: 0.1 } },
};

function CheckButton({ checked, handleCheck }: ICheckButtonProps) {
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  return (
    <motion.div
      animate={checked ? 'checked' : 'unchecked'}
      className="basis-[25px] shrink-0 h-[25px] rounded-sm flex items-center justify-center p-[5px] cursor-pointer 
     duration-300 ease-in-out hover:bg-gray-2 "
      variants={boxVariants}
      onClick={() => handleCheck()}
    >
      <motion.svg
        className="w-full h-full stroke-white flex items-center justify-center"
        viewBox="0 0 53 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          variants={checkVariants}
          animate={checked ? 'checked' : 'unchecked'}
          style={{ pathLength, opacity }}
          fill="none"
          strokeMiterlimit="10"
          strokeWidth="6"
          d="M1.5 22L16 36.5L51.5 1"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </motion.svg>
    </motion.div>
  );
}

export default CheckButton;