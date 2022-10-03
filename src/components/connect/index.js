import { toast } from 'react-toastify';
import { useEagerConnect, useInactiveListener } from '../../web3/hooks';
import { useWeb3React } from '@web3-react/core';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setWallet } from '../../actions/wallet';
import { Text } from '../../Text';

import { injected } from '../../web3/connectors';

const Connect = ({ setWallet }) => {
	const { connector, activate, active, error, account, deactivate } = useWeb3React();

	const [activatingConnector, setActivatingConnector] = useState();
	useEffect(() => {
		if (activatingConnector && activatingConnector === connector) {
			setActivatingConnector(undefined);
		}
	}, [activatingConnector, connector]);

	const triedEager = useEagerConnect();

	useInactiveListener(!triedEager || !!activatingConnector);

  useEffect(() => {
		if(!error) return;
		let message;
		if(error.name === 'UnsupportedChainIdError') {
			message = 'Unsupported network, please connect to Correct network'

      // Switch to BSC CHAIN
			window.ethereum
				.request({
					method: 'wallet_addEthereumChain',
					params: [
						{
							chainId: '0x61',
							chainName: 'BNB Smart Chain Testnet',
							nativeCurrency: {
								name: 'BNB',
								symbol: 'BNB',
								decimals: 18,
						},
							rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
							blockExplorerUrls: ['https://testnet.bscscan.com/'],
						},
					],
				})
				.catch((error) => {
					console.log(error);
				});
		} else {
			message = error.message;
		}
		toast.error(message, {
			position: 'top-left',
		});

  }, [error]);

	const connectWalletPressed = () => {
		setActivatingConnector(injected);
		activate(injected);
	};

	return (
		<div className='metamask__window'>
			<button
				className = 'py-2 px-5 rounded text-white font-bold bg-yellow-500 hover:bg-yellow-700'
				onClick={() => active ? '' : connectWalletPressed()}
			>
				{active && account.length > 0 ? (
					account.slice(0,4) + '...' + account.slice(40)
				) : (
					<span><Text tid='connectWithWallet' /></span>
				)}{active && account.length > 0 ? (
					setWallet(account)
				) : (''
				)}
			</button>
		</div>
	);
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, { setWallet })(Connect);