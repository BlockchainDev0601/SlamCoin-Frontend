import QR from './QR';
import { CopyToClipboard } from 'react-copy-to-clipboard';
const QRCode = (props) => {
	const { changeQrCode } = props;
	return (
		<div className="panel-qr" >
			<div className="close">
				<i className="fas fa-times" onClick={changeQrCode}></i>
			</div>
			<div className="image">
				<QR />
			</div>
			<div className="address">
				<p> A93A872ad2730xC7c...
					<CopyToClipboard text="A93A872ad2730xC7c">
						<i className="far fa-clone icon_copy" onClick={() => props.onClickCopyBtn("A93A872ad2730xC7c")}></i>
					</CopyToClipboard>
				</p>
			</div>
		</div>
	)
}

export default QRCode;