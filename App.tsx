import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
	Pressable,
	StyleSheet,
	Text,
	View,
	ActionSheetIOS,
	Platform,
	SafeAreaView,
	Modal,
	Alert,
	TouchableWithoutFeedback,
	Button,
	ProgressBarAndroidBase,
} from 'react-native';

export default function App() {
	const titleModal = 'Voulez-vous vraiment supprimer ?';
	const subTitleModal = 'Cette action est irréversible !';
	const [showModal, setShowModal] = useState(false);
	const showActionSheet = () => {
		if (Platform.OS === 'ios') {
			ActionSheetIOS.showActionSheetWithOptions(
				{
					options: ['Annuler', 'Supprimer'],
					destructiveButtonIndex: 1,
					cancelButtonIndex: 0,
					title: titleModal,
					message: subTitleModal,
				},
				(buttonIndex) => {
					if (buttonIndex === 1) {
						handleDelete();
					}
				}
			);
		} else {
			setShowModal(true);
		}
	};

	const hideModal = () => {
		setShowModal(false);
	};

	const handleDelete = () => {
		// Suppression à implémenter
		hideModal();
	};
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>ActionSheet en action</Text>
			<StatusBar style="auto" />
			<Button
				title="Action pour supprimer !"
				onPress={showActionSheet}
			/>
			<Modal
				visible={showModal}
				transparent>
				<TouchableWithoutFeedback onPress={hideModal}>
					<View style={styles.modalView}>
						<TouchableWithoutFeedback>
							<View style={styles.contentModalView}>
								<View style={styles.rowModalView}>
									<View style={styles.titleView}>
										<Text style={styles.modalTitle}>{titleModal}</Text>
										<Text style={styles.modalSubTitle}>{subTitleModal}</Text>
									</View>
									<View style={styles.separator} />
									<Pressable
										style={styles.button}
										onPress={handleDelete}>
										<Text style={[styles.textButton, styles.textConfirm]}>
											Confirmer
										</Text>
									</Pressable>
								</View>

								<View style={styles.rowModalView}>
									<Pressable
										style={styles.button}
										onPress={hideModal}>
										<Text style={styles.textButton}>Annuler</Text>
									</Pressable>
								</View>
							</View>
						</TouchableWithoutFeedback>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	modalView: {
		flex: 1,
		justifyContent: 'flex-end',
		padding: 10,
		backgroundColor: 'rgba(0, 0, 0, 0.2)',
		// gap: 10,
	},
	contentModalView: {
		gap: 10,
	},
	rowModalView: {
		backgroundColor: 'white',
		borderRadius: 20,
		paddingVertical: 10,
		alignItems: 'center',
		gap: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		padding: 5,
	},
	textButton: {
		fontSize: 18,
		color: 'blue',
	},
	textConfirm: {
		color: 'red',
	},

	titleView: {
		gap: 5,
		paddingBottom: 10,
	},
	modalTitle: {
		fontSize: 14,
		textAlign: 'center',
	},
	modalSubTitle: {
		fontSize: 12,
		textAlign: 'center',
		fontStyle: 'italic',
		color: 'gray',
	},
	separator: {
		backgroundColor: 'lightgray',
		height: 1,
		width: '100%',
	},
});
