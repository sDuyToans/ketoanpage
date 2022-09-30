// import { useSelector } from 'react-redux';
import '../../../styles/formfooter.scss'
// import { selectTong } from '../models/banhangreducer/banhang.selector';
const FormFooter = ({tongTien}) => {
    return (
        <div className='formfooter-container'>
            <ul className='formfooter-ul'>
                <li className='formfooter-li'>
                        <span>Tổng trước thuế</span>
                        <span>{tongTien}</span>
                </li>
                <li className='formfooter-li'>
                        <span>Thuế</span>
                        <span>0</span>
                </li>
                <li className='formfooter-li'>
                        <span>Chiết khấu</span>
                        <span>0</span>
                </li>
                <li className='formfooter-li'>
                        <span>Tổng</span>
                        <span>{tongTien}</span>
                </li>
            </ul>
        </div>
    )
};

export default FormFooter;