import React, {useState, useEffect} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import {ScrollView} from 'react-native'
import {useRouter, useLocalSearchParams} from 'expo-router'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {Box} from '@/components/ui/box'
import {VStack} from '@/components/ui/vstack'
import {HStack} from '@/components/ui/hstack'
import {Heading} from '@/components/ui/heading'
import {Button, ButtonSpinner, ButtonText} from '@/components/ui/button'
import {Input, InputField} from '@/components/ui/input'
import {Pressable} from '@/components/ui/pressable'
import {
  Select,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectItem,
  SelectTrigger,
  SelectPortal,
  SelectBackdrop,
  SelectInput,
} from '@/components/ui/select'
import {ChevronDownIcon} from 'lucide-react-native'
import {BeerCategory} from '@/model/customBeer'
import {useGetCustomBeerById, useUpdateCustomBeer} from '@/api/customBeers'
import {Textarea, TextareaInput} from '@/components/ui/textarea'
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from '@/components/ui/form-control'

const categoryOptions = Object.values(BeerCategory).map(option => ({
  label: option,
  value: option,
}))

const EditBeerScreen = () => {
  const router = useRouter()
  const {id} = useLocalSearchParams<{id: string}>()
  const {data: beer, isLoading} = useGetCustomBeerById(id)
  const {mutate: updateBeer, isPending} = useUpdateCustomBeer()

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    brewery: '',
    alcohol: '',
    category: '' as BeerCategory,
    description: '',
  })

  useEffect(() => {
    if (beer) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        name: beer.name ?? '',
        brewery: beer.brewery ?? '',
        alcohol: beer.alcohol ?? '',
        category: beer.category ?? BeerCategory.Pilsner,
        description: beer.description ?? '',
      })
    }
  }, [beer])

  const isFormValid = Object.values(form).every(val => val !== undefined && val !== null && val.toString() !== '')

  if (isLoading) {
    return (
      <Box className="flex-1 bg-black justify-center items-center">
        <ButtonSpinner color="#E67E22" />
      </Box>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView key={beer?.id} keyboardShouldPersistTaps="handled">
        <Box className="px-6 py-4">
          <HStack className="items-center" space="md">
            <Pressable onPress={() => router.push('/(myBeers)')} className="bg-[#E67E22] p-2 rounded-full">
              <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
            </Pressable>

            <Heading size="xl" className="text-[#E67E22]">
              Edit beer
            </Heading>
          </HStack>

          <VStack space="xl" className="mt-8">
            {/* Name */}
            <FormControl isInvalid={isSubmitted && !form.name.trim()} size="md">
              <VStack space="xs">
                <FormControlLabel>
                  <FormControlLabelText className="text-gray-400 font-bold ml-1">NAME *</FormControlLabelText>
                </FormControlLabel>
                <Input className="border-neutral-800 bg-neutral-900/50 h-14 rounded-2xl">
                  <InputField
                    className="text-white"
                    value={form.name}
                    onChangeText={val => setForm({...form, name: val})}
                  />
                </Input>
                <FormControlError>
                  <FormControlErrorText>Name is required</FormControlErrorText>
                </FormControlError>
              </VStack>
            </FormControl>

            {/* Brewery & Alcohol */}
            <HStack space="md">
              <FormControl className="flex-1" isInvalid={isSubmitted && !form.brewery.trim()}>
                <VStack space="xs">
                  <FormControlLabel>
                    <FormControlLabelText className="text-gray-400 font-bold ml-1">BREWERY *</FormControlLabelText>
                  </FormControlLabel>
                  <Input className="border-neutral-800 bg-neutral-900/50 h-14 rounded-2xl">
                    <InputField
                      className="text-white"
                      value={form.brewery}
                      onChangeText={val => setForm({...form, brewery: val})}
                    />
                  </Input>
                  <FormControlError>
                    <FormControlErrorText>Brewery is required</FormControlErrorText>
                  </FormControlError>
                </VStack>
              </FormControl>

              <FormControl className="w-1/3" isInvalid={isSubmitted && !form.alcohol.trim()}>
                <VStack space="xs">
                  <FormControlLabel>
                    <FormControlLabelText className="text-gray-400 font-bold ml-1">ALCOHOL % *</FormControlLabelText>
                  </FormControlLabel>
                  <Input className="border-neutral-800 bg-neutral-900/50 h-14 rounded-2xl">
                    <InputField
                      className="text-white"
                      keyboardType="numeric"
                      value={form.alcohol}
                      onChangeText={val => setForm({...form, alcohol: val})}
                    />
                  </Input>
                  <FormControlError>
                    <FormControlErrorText>Alcohol is required</FormControlErrorText>
                  </FormControlError>
                </VStack>
              </FormControl>
            </HStack>

            {/* Category */}
            <FormControl isInvalid={isSubmitted && !form.category}>
              <VStack space="xs">
                <FormControlLabel>
                  <FormControlLabelText className="text-gray-400 font-bold ml-1">CATEGORY *</FormControlLabelText>
                </FormControlLabel>
                <Select
                  selectedValue={form.category}
                  onValueChange={val => setForm({...form, category: val as BeerCategory})}>
                  <SelectTrigger className="border-neutral-800 bg-neutral-900/50 h-14 rounded-2xl px-4 flex-row justify-between items-center">
                    <Box pointerEvents="none" className="flex-1">
                      <SelectInput placeholder="Kies een categorie..." className="text-white" value={form.category} />
                    </Box>
                    <SelectIcon as={ChevronDownIcon} />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent className="bg-neutral-900 border-t border-neutral-800 pb-10">
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      {categoryOptions.map(opt => (
                        <SelectItem key={opt.value} label={opt.label} value={opt.value} />
                      ))}
                    </SelectContent>
                  </SelectPortal>
                </Select>
                <FormControlError>
                  <FormControlErrorText>Choose a category</FormControlErrorText>
                </FormControlError>
              </VStack>
            </FormControl>

            {/* Description */}
            <FormControl isInvalid={isSubmitted && !form.description}>
              <VStack space="xs">
                <FormControlLabel>
                  <FormControlLabelText className="text-gray-400 font-bold ml-1">DESCRIPTION *</FormControlLabelText>
                </FormControlLabel>

                <Textarea className="border-neutral-800 bg-neutral-900/50 rounded-2xl h-32 overflow-hidden">
                  <TextareaInput
                    style={{color: 'white', textAlignVertical: 'top'}}
                    className="text-white p-4"
                    placeholder="Vertel iets over dit bier..."
                    placeholderTextColor="#666"
                    value={form.description}
                    onChangeText={val => setForm({...form, description: val})}
                    multiline={true}
                  />
                </Textarea>

                <FormControlError>
                  <FormControlErrorText>Description is required</FormControlErrorText>
                </FormControlError>
              </VStack>
            </FormControl>

            <Button
              size="lg"
              className="bg-[#E67E22] rounded-full h-14 mt-4"
              onPress={() => {
                setIsSubmitted(true)
                if (isFormValid && beer?.id) {
                  updateBeer(
                    {
                      id: beer.id,
                      data: form,
                    },
                    {
                      onSuccess: () => router.push('/(myBeers)'),
                    },
                  )
                }
              }}>
              {isPending ? (
                <ButtonSpinner color="black" />
              ) : (
                <ButtonText className="text-black font-extrabold text-lg">UPDATE BEER</ButtonText>
              )}
            </Button>
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EditBeerScreen
