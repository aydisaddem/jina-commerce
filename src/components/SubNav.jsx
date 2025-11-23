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
            solo: ["Mobile Phones", "Smartphones", "Landline Phones","Smartwatches"],

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
      columns: [
        {
          title: "Imprimantes",
          items: ["À Réservoir Intégré", "Jet D'encre"],
        },
        {
          title: "Imprimantes",
          items: ["À Réservoir Intégré", "Jet D'encre"],
        },
      ],
    },
    {
      label: "Impression",
      columns: [
        {
          title: "Imprimantes",
          items: ["À Réservoir Intégré", "Jet D'encre"],
        },
        {
          title: "Imprimantes",
          items: ["À Réservoir Intégré", "Jet D'encre"],
        },
      ],
    },
    {
      label: "TV-Sound-Photos",
      columns: [
        {
          title: "Imprimantes",
          items: ["À Réservoir Intégré", "Jet D'encre"],
        },
        {
          title: "Imprimantes",
          items: ["À Réservoir Intégré", "Jet D'encre"],
        },
      ],
    },
    {
      label: "Security",
      columns: [
        {
          title: "Imprimantes",
          items: ["À Réservoir Intégré", "Jet D'encre"],
        },
        {
          title: "Imprimantes",
          items: ["À Réservoir Intégré", "Jet D'encre"],
        },
      ],
    },
    {
      label: "Network & Connections",
      columns: [
        {
          title: "Imprimantes",
          items: ["À Réservoir Intégré", "Jet D'encre"],
        },
        {
          title: "Imprimantes",
          items: ["À Réservoir Intégré", "Jet D'encre"],
        },
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
