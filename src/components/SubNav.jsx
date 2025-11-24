const SubNAv = () => {
  const navItems = [
    {
      label: "Computers",
      solo: ["Laptop", "Gaming Laptop", "Professional Laptop"],
      columns: [
        {
          title: "Laptop",
          items: ["Laptop", "Gaming Laptop", "Professional Laptop"],
        },
        {
          title: "Desktop PCs",
          items: ["Gaming Desktop PCs", "All-in-One PCs", "Full Gaming Setups"],
        },
        {
          title: "Accessories",
          items: [
            "Headsets & Earphones",
            "Bags & Backpacks",
            "Mouse",
            "Keyboards",
            "Mouse Pads",
            "Coolers",
            "Webcams",
            "Monitors",
          ],
        },
        {
          title: "Computer Components",
          items: [
            "Internal Hard Drive",
            "Fan & Cooler",
            "Processor",
            "Motherboard",
            "Graphics Card",
            "Laptop Keyboard",
            "Laptop Battery",
            "Laptop Charger",
          ],
        },
      ],
    },
    {
      label: "Phones & Tablets",
      solo: ["Mobile Phones", "Smartphones", "Landline Phones", "Smartwatches"],

      columns: [
        {
          title: "Tablets",
          items: [
            "Touchscreen Tablets",
            "Graphic Tablets",
            "Tablet Protective Cases",
            "Tablet Chargers & Cables",
            "Tablet Screen Protectors",
            "Miscellaneous Tablet Accessories",
          ],
        },
        {
          title: "Phone Accessories",
          items: [
            "Phone Protective Cases",
            "Smartphone Screen Protectors",
            "Phone Chargers & Cables",
            "Power Banks",
            "Miscellaneous Phone Accessories",
          ],
        },
      ],
    },

    {
      label: "Storage",
      solo: [
        "External Hard Drives",
        "Storage Servers",
        "Storage Accessories",
        "USB Flash Drives",
        "Memory Cards",
      ],
      columns: [
        {
          title: "Internal Drives",
          items: [
            "Standard Internal",
            "Drives",
            "SSD Drives",
            "Internal Drives for Storage Servers",
            "Internal Drives for Video Surveillance",
          ],
        },
      ],
    },
    {
      label: "Impression",
      solo: ["Fax", "Scanners machines"],
      columns: [
        {
          title: "Printers",
          items: [
            "Integrated ink tank printers",
            "Inkjet printers and multifunction printers",
            "Laser printers and multifunction printers",
            "Professional printers",
            "Printer accessories",
          ],
        },
        {
          title: "Copiers",
          items: [
            "A4 | A3 copiers",
            "Copier accessories",
            "A4 paper",
            "A3 paper",
            "Envelopes",
            "Photo paper",
          ],
        },
      ],
    },
    {
      label: "TV-Sound-Photos",
      columns: [
        {
          title: "Video Projectors",
          items: ["Video Projectors", "Video Projector Accessories"],
        },
        {
          title: "Consoles & Games",
          items: ["Consoles", "Game Controllers", "Console Accessories"],
        },
        {
          title: "Televisions",
          items: ["Televisions", "TV Accessories"],
        },
        {
          title: "Sound",
          items: [
            "Home Theater",
            "Systems",
            "Soundbars",
            "Headphones & Earphones",
            "Speakers",
            "Radio - Alarm Clock",
            "Stereo System",
            "Microphone",
          ],
        },
      ],
    },
    {
      label: "Security",
      columns: [
        {
          title: "Alarm System",
          items: ["Wired Alarm", "Wireless Alarm", "Accessories"],
        },
        {
          title: "Security Equipment",
          items: [
            "Surveillance Cameras",
            "Security Kits",
            "Recorders",
            "Security Accessories",
            "Detectors and Sensors",
          ],
        },
      ],
    },
    {
      label: "Network & Connections",
      columns: [
        {
          title: "Network",
          items: [
            "Switches / Routers / Access Points",
            "Network Cards",
            "Wi-Fi - Bluetooth Adapters",
            "Powerline Adapters",
            "Network Cabinets and Enclosures",
            "Power Strips",
            "Network Accessories",
          ],
        },
        {
          title: "Cables and Connectors",
          items: [
            "HDMI Cables",
            "USB Cables",
            "Network Cables",
            "FireWire Cables",
            "TV/Audio/DVD Screen Cables",
            "Power Cables",
            "Adapters/Converters",
          ],
        },
        {
          title:"Enclosures and Accessories",
          items:["Network Enclosures and Cabinets","Accessories"]
        }
      ],
    },
  ];

  return (
    <div className="sub-nav">
      <ul className="sub-nav-list">
        {navItems.map((item, idx) => (
          <li key={idx} className="has-dropdown">
            {item.label}
            <div className="mega-dropdown">
              {item.solo?.length > 0 && (
                <div className="solo">
                  {item.solo.map((solo, soloIdx) => (
                    <h5 key={soloIdx}>{solo}</h5>
                  ))}
                </div>
              )}

              {item.columns.map((col, colIdx) => (
                <div key={colIdx} className="column">
                  <h5>{col.title}</h5>
                  <ul>
                    {col.items.map((subItem, subIdx) => (
                      <li key={subIdx}>{subItem}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubNAv;
