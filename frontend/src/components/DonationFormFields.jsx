import React from "react";

const DonationFormFields = ({
  formData,
  errors,
  handleChange,
  handleLocationSelect,
  LocationPicker,
}) => (
  <>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="lg:col-span-2">
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Donation Title *
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          className="input-field"
          placeholder="e.g., Fresh Bread from Local Bakery, Cooked Rice for 50 people"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>
      <div className="lg:col-span-2">
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          className="input-field resize-none"
          placeholder="Describe the food in detail, including ingredients, preparation method, and any special notes"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="quantity"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Quantity *
        </label>
        <input
          id="quantity"
          name="quantity"
          type="text"
          value={formData.quantity}
          onChange={handleChange}
          className="input-field"
          placeholder="e.g., 20 loaves, 5kg rice, serves 30 people"
        />
        {errors.quantity && (
          <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="expiryDate"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Expiry Date *
        </label>
        <input
          id="expiryDate"
          name="expiryDate"
          type="date"
          value={formData.expiryDate}
          onChange={handleChange}
          min={new Date().toISOString().split("T")[0]}
          className="input-field"
        />
        {errors.expiryDate && (
          <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
        )}
      </div>
      <div className="lg:col-span-2">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Pickup Address *
        </label>
        <LocationPicker
          onLocationSelect={handleLocationSelect}
          currentAddress={formData.pickupAddress}
          setCurrentAddress={(address) => handleLocationSelect(address)}
        />
        {errors.pickupAddress && (
          <p className="mt-1 text-sm text-red-600">{errors.pickupAddress}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="pickupTimeStart"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Pickup Start Time *
        </label>
        <input
          id="pickupTimeStart"
          name="pickupTimeStart"
          type="time"
          value={formData.pickupTimeStart}
          onChange={handleChange}
          className="input-field"
        />
        {errors.pickupTimeStart && (
          <p className="mt-1 text-sm text-red-600">{errors.pickupTimeStart}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="pickupTimeEnd"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Pickup End Time *
        </label>
        <input
          id="pickupTimeEnd"
          name="pickupTimeEnd"
          type="time"
          value={formData.pickupTimeEnd}
          onChange={handleChange}
          className="input-field"
        />
        {errors.pickupTimeEnd && (
          <p className="mt-1 text-sm text-red-600">{errors.pickupTimeEnd}</p>
        )}
      </div>
    </div>
  </>
);

export default DonationFormFields;
