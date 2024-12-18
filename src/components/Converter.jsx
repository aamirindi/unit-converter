import React, { useState } from "react";
import { convert, unitOptions } from "../utils/conversion";
import { motion } from "framer-motion";

const CustomDropdown = ({ options, value, onChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      <div
        onClick={() => setOpen(!open)}
        className="p-3 border rounded-lg cursor-pointer bg-white border-gray-300 outline-none"
      >
        {value}
      </div>
      {open && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className="p-3 hover:bg-[#00f335b2] hover:text-black  cursor-pointer transition-colors"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Converter = () => {
  const [category, setCategory] = useState("weight");
  const [fromUnit, setFromUnit] = useState("lb");
  const [toUnit, setToUnit] = useState("kg");
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");

  const handleConvert = () => {
    if (inputValue === "") return;
    const res = convert(category, fromUnit, toUnit, parseFloat(inputValue));
    setResult(
      typeof res === "number" && !isNaN(res)
        ? res.toFixed(2)
        : "Invalid conversion"
    );
  };

  return (
    <div className="flex items-center justify-center converter">
      <motion.div
        className="container p-8 rounded-3xl shadow-xl w-full max-w-lg transform transition duration-500 hover:shadow-2xl"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-semibold italic font-['Roboto'] text-center mb-8 text-gray-200">
          Unit Converter
        </h1>

        {/* Category Selection */}
        <div className="mb-6">
          <label className="block font-medium text-gray-400 mb-2">
            Category
          </label>
          <CustomDropdown
            options={Object.keys(unitOptions)}
            value={category}
            onChange={(value) => {
              setCategory(value);
              setFromUnit(unitOptions[value][0]);
              setToUnit(unitOptions[value][1]);
            }}
          />
        </div>

        {/* From and To Units */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <label className="block font-medium text-gray-400 mb-2">From</label>
            <CustomDropdown
              options={unitOptions[category]}
              value={fromUnit}
              onChange={(value) => setFromUnit(value)}
            />
          </div>

          <div className="flex-1">
            <label className="block font-medium text-gray-400 mb-2">To</label>
            <CustomDropdown
              options={unitOptions[category]}
              value={toUnit}
              onChange={(value) => setToUnit(value)}
            />
          </div>
        </div>

        {/* Input Field */}
        <div className="mb-6">
          <label className="block font-medium text-gray-400 mb-2">Value</label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 outline-none"
            placeholder="Enter value"
          />
        </div>

        {/* Convert Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleConvert}
          className="w-full bg-[#00f335] text-black hover:text-white p-3 rounded-lg font-semibold shadow-md hover:bg-[#00f335b2]"
        >
          Convert
        </motion.button>

        {/* Result */}
        {result && (
          <div className="mt-6 text-2xl font-semibold text-center text-gray-300">
            Result :{" "}
            <span className="text-[#00f335b2]">
              {result} {toUnit}
            </span>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Converter;
