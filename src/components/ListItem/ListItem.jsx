import React, { useRef, useState, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io'
import './styles.css'

const ListItem = ({ item, varieties }) => {

  const [isOpen, setIsOpen] = useState(false)
  const [height, setHeight] = useState("0px")
  const [chosenVarieties, setChosenvarieties] = useState(new Array(item.varieties.length).fill(""))
  const [productCode, setProductCode] = useState(item.code)

  const itemRef = useRef()
  const refHeight = useRef()

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
    setHeight(`${refHeight.current.scrollHeight + 80 + 5 * item.varieties.length}px`)
  }

  const handleVarietyChange = (e, id) => {
    let varieties = [...chosenVarieties]
    varieties[id] = e.target.value
    setChosenvarieties(varieties)
  }

  useEffect(() => {
    const allVarietiesChosen = chosenVarieties.every(v => v) && chosenVarieties.length
    const code = allVarietiesChosen ?
      `${item.code}.${chosenVarieties.join('.')}` : item.code

    setProductCode(code)
  }, [item.code, chosenVarieties])

  useEffect(() => {
    function handleClickOutside(event) {
      if (itemRef.current && !itemRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [itemRef]);

  return (
    <div
      className="list-item"
      onClick={() => !isOpen && toggleAccordion()}
      ref={itemRef}
    >
      <div
        className="basic-content"
        onClick={() => toggleAccordion()}
      >
        <div className="code">
          {item.code}
        </div>
        <div className="description">
          {item.description}
        </div>
        <IoIosArrowDown
          className={`arrow ${isOpen ? "rotate" : null}`}
        />
      </div>
      <div
        className="expanded-content"
        ref={refHeight}
        style={{
          height: isOpen ? height : "0",
          paddingBottom: isOpen ? "20px" : "0"
        }}
      >
        {item.varieties.map((variety, id) => (
          <div className="variety-picker" key={id}>
            <div className="variety-title">
              {variety + ':'}
            </div>
            <select
              className="variety-select"
              defaultValue={'aaa'}
              onChange={(e) => handleVarietyChange(e, id)}
            >
              <option value={''}>
                Select product option
              </option>
              {varieties
                .find(v => v.code === variety)
                .options.map((item, id) => (
                  <option
                    className="option"
                    value={item.code}
                    key={id}
                  >
                    {item.description}
                  </option>
                ))}
            </select>
          </div>
        ))}
        <div className="full-code">
          {`Product code: ${productCode}`}
        </div>
      </div>
    </div>
  );
}

export default ListItem;