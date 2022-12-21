import {
    Alert, AlertDescription, AlertIcon, Box, Button, Center, CloseButton, Divider, FormControl, FormHelperText, FormLabel, Image, Input, SimpleGrid, Text, useDisclosure
} from '@chakra-ui/react';
import { useState } from 'react';

function AlertBox(props) {

    return props.isOpen ? <>
        <Alert status={props.type}>
            <AlertIcon />
            <Box>
                <AlertDescription>
                    {props.message}
                </AlertDescription>
            </Box>
            <CloseButton
                alignSelf='flex-start'
                position='relative'
                right={-1}
                top={-1}
                onClick={props.onClose}
            />
        </Alert><Divider /></>
        : <Divider />

}
export default function App() {
    const [chassis, setChassis] = useState('')
    const [alertMsg, setAlertMsg] = useState('')
    const [hasError, setHasError] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    function handleCalculate(e) {
        onClose();
        const month_index = 12 - 1;
        const year_index = 10 - 1;
        const month_codes = {
            "A": "January",
            "B": "February",
            "C": "March",
            "D": "April",
            "E": "May",
            "F": "June",
            "G": "July",
            "H": "August",
            "J": "September",
            "K": "October",
            "N": "November",
            "P": "December"
        };
        const year_codes = {
            'A': '2010',
            'B': '2011',
            'C': '2012',
            'D': '2013',
            'E': '2014',
            'F': '2015',
            'G': '2016',
            'H': '2017',
            'J': '2018',
            'K': '2019',
            'L': '2020',
            'M': '2021',
            'N': '2022',
            'P': '2023',
            'R': '2024',
            'S': '2025',
            'T': '2026',
            'V': '2027',
            'W': '2028',
            'X': '2029',
            'Y': '2030',
        }

        const month = chassis.charAt(month_index);
        const year = chassis.charAt(year_index);
        onOpen();
        if (chassis.length < 17 || (month_codes[month] === undefined || year_codes[year] === undefined)) {
            setHasError(true);
            setAlertMsg('Invalid Chassis or VIN. Please enter a valid chassis or VIN number.');
        } else {
            setHasError(false);
            setAlertMsg(`Manufacturing Date is ${month_codes[month]} ${year_codes[year]}`);
        }
    }
    return (
        <Center>
            <SimpleGrid columns={1} spacing={8} justifyItems="left" padding={4}>
                <Divider />
                <Image src="tata.svg" />
                <Text fontSize="lg">
                    Use this tool to retrieve the manufacturing date of your vehicle through its chassis number or VIN number.
                </Text>
                <AlertBox isOpen={isOpen} onClose={onClose} message={alertMsg} type={!hasError ? "success" : "error"} />
                <FormControl alignSelf="center">
                    <FormLabel>Chassis / VIN Number</FormLabel>
                    <Input name="chassis" type='email' maxWidth="65%" placeholder="Eg. MAT999999ABC12345" onChange={e => setChassis(e.target.value.toUpperCase())} />
                    <Button type="submit" colorScheme={"green"} variant="outline" margin={2} onClick={e => handleCalculate(e)}>Calculate</Button>
                    <Divider />
                    <FormHelperText>We do not store your chasis number or any entered data on our server. This project or website is not associated with Tata Motors Limited or its subsidiaries.</FormHelperText>
                </FormControl>
            </SimpleGrid>
        </Center >
    );
}