import React, { useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { InputText } from "primereact/inputtext";
import Style from '../country-dropdown/country.module.css';

export default function FilterDemo() {
    const [countryValue, setCountryValue] = useState('')
    const [selectedCountry, setSelectedCountry] = useState({ name: 'India', code: 'IN', phoneCode: '+91' });
    const countries = [
        { name: 'Australia', code: 'AU', phoneCode: '+61' },
        { name: 'Brazil', code: 'BR', phoneCode: '+55' },
        { name: 'China', code: 'CN', phoneCode: '+86' },
        { name: 'Egypt', code: 'EG', phoneCode: '+20' },
        { name: 'France', code: 'FR', phoneCode: '+33' },
        { name: 'Germany', code: 'DE', phoneCode: '+49' },
        { name: 'India', code: 'IN', phoneCode: '+91' },
        { name: 'Japan', code: 'JP', phoneCode: '+81' },
        { name: 'Spain', code: 'ES', phoneCode: '+34' },
        { name: 'United States', code: 'US', phoneCode: '+1' }
      ];

    const selectedCountryTemplate = (option : any, props : any) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} />
                    {/* <div>{option.name}</div> */}
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const countryOptionTemplate = (option : any) => {
        return (
            <div className="flex align-items-center">
                <img alt={option.name} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} />
                <div>{option.name}</div>
            </div>
        );
    };

    return (
        <div className="flex items-center border border-[#E5E9EB] border-solid rounded-[4px]">
            <Dropdown value={selectedCountry} checkmark={true} highlightOnSelect={false} onChange={(e) => setSelectedCountry(e.value)} options={countries} optionLabel="name" 
                filter valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate} className={Style.country_dropdown} />
                <span className="text-[14px] text-[#48535B] font-normal leading-[21px]">{selectedCountry.phoneCode}</span>
                <InputText className={Style.phone_field} keyfilter="int" placeholder="Enter your number" value={countryValue} onChange={(e) => setCountryValue(e.target.value)}
                  required/>
                  <img src="assets/contact_delete_icon.svg" alt="Contact Delete Icon" style={{cursor : 'pointer'}}/>
        </div>    
    )
}
        