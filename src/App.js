import React, { Fragment, useState } from 'react';

// mocks data
import { desks, alphabet } from './mocks/data';

function App() {
  const [selectedChairs, setSelectedChairs] = useState({});
  let [price, setPrice] = useState(0);

  const handleChoose = (indexRow, indexSheet, type) => {
    /* select chair */
    if (!selectedChairs[`${indexRow}_${indexSheet}`] && Object.keys(selectedChairs).length < 6) {
      selectedChairs[`${indexRow}_${indexSheet}`] = indexSheet + 1;
      switch(type) {
        case 'standard':
          price += 60;
          break;
        case 'vip':
          price += 90;
          break;
        default:
          price += 110;
          break;
      }
    } else {
      delete selectedChairs[`${indexRow}_${indexSheet}`];   
      if (Object.keys(selectedChairs).length < 6) {
        switch(type) {
          case 'standard':
            price -= 60;
            break;
          case 'vip':
            price -= 90;
            break;
          default:
            price -= 110;
            break;
        }   
      }
    }

    // setState
    setSelectedChairs({ ...selectedChairs });
    setPrice(price);
  }

  const _renderChair = (row, indexRow) => {
    return (
      <Fragment>
        <div className="sheets__row">
          <div className="sheets__alphabet">{alphabet[indexRow]}</div>
          {row.map((sheet, indexSheet) => {
            const disableClick = sheet.type === 'empty' || sheet.type === 'occupied';
            return (
              <Fragment key={indexSheet}>
                <div
                  className={`sheet ${sheet.type} ${selectedChairs[`${indexRow}_${indexSheet}`] >= 0 && 'active'}`}
                  onClick={() => {
                    if (!disableClick) {
                      handleChoose(indexRow, indexSheet, sheet.type)
                    }
                  }}
                >
                    {selectedChairs[`${indexRow}_${indexSheet}`] >= 0  && selectedChairs[`${indexRow}_${indexSheet}`]}
                </div>

              </Fragment>
            )
          })}
        </div>
      </Fragment>
    )
  }
  
  const _renderRows = () => {
    return (
      <>
        {desks.map((row, indexRow) => {
          return (
            <Fragment key={indexRow}>
              {_renderChair(row, indexRow)}
            </Fragment>
          )
        })}
      </>
    )
  }
  return (
    <div className="app">
      <div className="title">
        <h2 className="title__head">Spider-man: Người nhện xa nhà</h2>
        <h3 className="title__lead">C13 | 2D Vietnam sub</h3>
      </div>
      <div className="sheets">
        {_renderRows()}
      </div>
      <h2>Chú thích</h2>
      <div className="notes">
        <div>
          <div className="type"><span>Đã đặt</span></div>
          <div className="type type--selected"><span>Đang chọn</span></div>
        </div>
        <div>
          <div className="chair chair--standard">Standard - 60.000đ</div>
          <div className="chair chair--vip">VIP - 90.000đ</div>
          <div className="chair chair--deluxe">Deluxe - 110.000đ</div>
        </div>
      </div>
      <h2>Thông tin thanh toán</h2>
      <div className="payment">
        <div>
          CGV Crescent Mall <br/> <br/>
          09:10~11:10 | 08/07/2019
        </div>
        <div>{price}{price > 0 && '.000'} đ</div>
      </div>
    </div>
  );
}

export default App;
