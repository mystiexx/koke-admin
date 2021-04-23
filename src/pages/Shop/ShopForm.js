import React, { useState } from 'react';
import './Shop.css';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Input,
	useToast,
	Button,
	HStack,
	Tag,
	TagLabel,
	TagCloseButton,
	InputGroup,
	InputLeftAddon,
	Image
} from '@chakra-ui/react';
import Files from 'react-files';
import { FcOldTimeCamera } from 'react-icons/fc';
import { postProducts } from '../../services/shop'

function ShopForm(props) {
    const toast = useToast()
	const [ loading, setLoading ] = useState(false);
	const [ sizes, setSizes ] = useState([]);
	const [ colors, setColors ] = useState([]);
	const [ files, setFiles ] = useState([]);
    const [productName, setProductName] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')

    const Submit = async () => {
        const formData = new FormData()
            formData.append("productName", productName)
            formData.append("sizes", sizes)
            formData.append("colors", colors)
            formData.append("price", price)
            formData.append("quantity", quantity)
            formData.append("pictures", files[0])    
        try {
            let { data } = await postProducts(formData)
            setLoading(false)
            if ( data ) {
                toast({
					title: 'Added.',
					description: data.message,
					status: 'success',
					duration: 9000,
					isClosable: true,
					position: 'top-right'
				});
            }
        } catch (err) {

        }
    }

	const FileChange = (files) => {
		setFiles(files);
	};

	const FileError = (error, file) => {
		console.log('error code ' + error.code + ': ' + error.message);
	};

	const onKeyDown = (e) => {
		const val = e.target.value;
		if (e.key === 'Enter' && val) {
			setSizes([ ...sizes, val ]);
			e.target.value = null;
		}
	};

	const onKeyDownI = (e) => {
		const val = e.target.value;
		if (e.key === 'Enter' && val) {
			setColors([ ...colors, val ]);
			e.target.value = null;
			console.log(sizes);
		}
	};

	const removeTag = (i) => {
		const newTags = [ ...sizes ];
		newTags.splice(i, 1);
		setSizes(newTags);
	};

	const removeTagI = (i) => {
		const newTags = [ ...colors ];
		newTags.splice(i, 1);
		setSizes(newTags);
	};
	return (
		<div>
			<Modal isOpen={props.isOpen} onClose={props.Close}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader style={{ background: '#0b0c10', color: '#fff' }}>
						Add Product
					</ModalHeader>
					<ModalCloseButton onClick={props.Close} style={{ color: '#fff' }} />
					<ModalBody>
						<InputGroup className="mt-3">
							<InputLeftAddon
								children="Name"
								style={{
									font: 'normal normal normal 15px/20px Lato',
									color: '#1F2833'
								}}
							/>
							<Input type="text" variant="filled" onChange={(e) => setProductName(e.target.value)}/>
						</InputGroup>

						<InputGroup className="mt-3">
							<InputLeftAddon
								children="Price"
								style={{
									font: 'normal normal normal 15px/20px Lato',
									color: '#1F2833'
								}}
							/>
							<Input type="text" variant="filled" onChange={e => setPrice(e.target.value)}/>
						</InputGroup>

						<Input
							type="text"
							variant="filled"
							onKeyDown={onKeyDown}
							placeholder="Sizes"
							className="mt-3"
							style={{ width: '100%' }}
						/>
						<HStack spacing={4}>
							{sizes.map((size, i) => (
								<Tag
									size="md"
									key={size}
									className="mt-2"
									borderRadius="full"
									style={{
										background: '#1f2833',
										font: "'normal normal normal 15px/20px Lato"
									}}
								>
									<TagLabel
										style={{
											font: "'normal normal normal 15px/20px Lato",
											color: 'white'
										}}
									>
										{size}
									</TagLabel>
									<TagCloseButton
										onClick={() => removeTag(i)}
										style={{ color: 'white' }}
									/>
								</Tag>
							))}
						</HStack>
						<Input
							type="text"
							variant="filled"
							onKeyDown={onKeyDownI}
							placeholder="Colors"
							className="mt-3"
							style={{ width: '100%' }}
						/>
						<HStack spacing={4}>
							{colors.map((size, i) => (
								<Tag
									size="md"
									key={size}
									className="mt-2"
									borderRadius="full"
									style={{
										background: '#1f2833',
										font: "'normal normal normal 15px/20px Lato"
									}}
								>
									<TagLabel
										style={{
											font: "'normal normal normal 15px/20px Lato",
											color: 'white'
										}}
									>
										{size}
									</TagLabel>
									<TagCloseButton
										onClick={() => removeTagI(i)}
										style={{ color: 'white' }}
									/>
								</Tag>
							))}
						</HStack>
						<InputGroup className="mt-3">
							<InputLeftAddon
								children="Quantity"
								style={{
									font: 'normal normal normal 15px/20px Lato',
									color: '#1F2833'
								}}
							/>
							<Input type="text" variant="filled" onChange={e => setQuantity(e.target.value)}/>
						</InputGroup>

						<div className="files">
							<Files
								className="mt-3 mb-3 files-dropzone"
								onChange={FileChange}
								onError={FileError}
								name="fileselect"
								id="fileselect"
								accepts={[ 'image/jpg', 'image/png', 'image/jpeg' ]}
								multiple
								minFiles={1}
								maxFiles={5}
								maxFileSize={1000000}
								minFileSize={1000}
								clickable
							>
								<Button leftIcon={<FcOldTimeCamera />} variant="solid">
									Select Images
								</Button>
							</Files>
						</div>

                        <div className="d-flex flex-wrap">
                        {files ? (
							files.map((file) => (
								<div key={file.name} className="flex-row">
									<Image
										borderRadius="full"
										boxSize="80px"
										src={`${file.preview.url}`}
										alt="Shop image"
									/>
								</div>
							))
						) : (
							<p>no file selected</p>
						)}
                        </div>

					
					</ModalBody>

					<ModalFooter>
						<Button
							style={{ background: '#1f2833', color: '#fff' }}
                            onClick={Submit}
							disabled={loading}
							isLoading={loading}
						>
							Add
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
}

export default ShopForm;
