const AddressEntry = ({data ,mode, handleChange ,existingAddress, buttonSubmit}) =>{
    return(
 <div className="address-form-container">
              <div className="form-wrapper">
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      First Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={data.firstName}
                      onChange={(e) => handleChange(mode, e)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      Last Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={data.lastName}
                      onChange={(e) => handleChange(mode, e)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Company</label>
                  <input
                    type="text"
                    name="company"
                    value={data.company}
                      onChange={(e) => handleChange(mode, e)}
                  />
                </div>

                <div className="form-group">
                  <label>VAT Number</label>
                  <input
                    type="text"
                    name="vatNumber"
                    value={data.vatNumber}
                      onChange={(e) => handleChange(mode, e)}
                  />
                </div>

                <div className="form-group">
                  <label>
                    Address <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={data.address}
                      onChange={(e) => handleChange(mode, e)}
                    placeholder="123 Main Street"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Address Complement</label>
                  <input
                    type="text"
                    name="addressComplement"
                    value={data.addressComplement}
                      onChange={(e) => handleChange(mode, e)}
                    placeholder="Apartment, suite, etc."
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={data.postalCode}
                      onChange={(e) => handleChange(mode, e)}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      City <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={data.city}
                      onChange={(e) => handleChange(mode, e)}
                      placeholder="Sfax"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    Phone <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={data.phone}
                      onChange={(e) => handleChange(mode, e)}
                    placeholder="12345678"
                    required
                  />
                </div>
           {(!existingAddress &&  <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="useBillingAddress"
                      checked={data.useBillingAddress}
                      onChange={(e) => handleChange(mode, e)}
                    />
                    <span>Use this address for billing</span>
                  </label>
                </div>)}
                <button className="addAddress-btn" type="submit" onClick={(e)=>buttonSubmit(e)}>{mode === "add" ? "Add Address" : "Save Changes"}</button>
               
              </div>
            </div>
    )
}

export default AddressEntry;