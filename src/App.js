import {
    Button, Center, FormControl, FormHelperText, Text, FormLabel, Image, Input, SimpleGrid, useColorMode, useToast
} from '@chakra-ui/react';
import { useState } from 'react';

export default function App() {
    const toast = useToast()
    const { colorMode, toggleColorMode } = useColorMode();
    const [chassis, setChassis] = useState('');

    function handleCalculate(e) {
        e.preventDefault();
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
        toast.closeAll();
        if (chassis.length < 17 || (month_codes[month] === undefined || year_codes[year] === undefined)) {
            toast({
                title: 'Invalid Chassis or VIN',
                description: 'Please enter a valid chassis or VIN number',
                status: 'error',
                isClosable: true,
            });
            return;
        }
        toast({
            title: 'Manfacturing Date',
            description: `${month_codes[month]} ${year_codes[year]}`,
            status: 'success',
            isClosable: true,
        });
        return;
    }
    if (colorMode === 'light') {
        toggleColorMode();
    }
    return (
        <Center>
            <SimpleGrid columns={1} spacing={16} justifySelf="center" padding={4}>
                <Image src="tata.svg" mpad />
                <Text fontSize="sm">
                    Use this tool to retrieve the manufacturing date of your vehicle through its chassis number or VIN number.
                </Text>
                <FormControl alignSelf="center">
                    <FormLabel>Chassis / VIN Number</FormLabel>
                    <Input name="chassis" type='email' maxWidth="75vh" placeholder="Eg. MAT999999ABC12345" onChange={e => setChassis(e.target.value.toUpperCase())} />
                    <Button type="submit" variant="outline" mt={4} onClick={e => handleCalculate(e)}>Calculate</Button>
                    <FormHelperText>We do not store your chasis number or any entered data on our server.</FormHelperText>
                </FormControl>
            </SimpleGrid>
        </Center>
    );
}