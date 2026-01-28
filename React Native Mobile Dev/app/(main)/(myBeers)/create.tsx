import React, {useState} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import {ScrollView} from 'react-native'
import {useRouter} from 'expo-router'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {Box} from '@/components/ui/box'
import {VStack} from '@/components/ui/vstack'
import {HStack} from '@/components/ui/hstack'
import {Text} from '@/components/ui/text'
import {Heading} from '@/components/ui/heading'
import {Button, ButtonSpinner, ButtonText} from '@/components/ui/button'
import {Input, InputField} from '@/components/ui/input'
import {Textarea, TextareaInput} from '@/components/ui/textarea'
import {Pressable} from '@/components/ui/pressable'
import {useAddCustomBeer} from '@/api/customBeers'
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from '@/components/ui/select'
import {ChevronDownIcon} from 'lucide-react-native'
import {BeerCategory} from '@/model/customBeer'
import {FormControl, FormControlLabel, FormControlLabelText} from '@/components/ui/form-control'

const categoryOptions = Object.values(BeerCategory).map(option => {
  return {label: option, value: option}
})

const CreateBeerScreen = () => {
  const router = useRouter()
  const {mutate: addBeer, isPending} = useAddCustomBeer()

  const initialFormState = {
    name: '',
    brewery: '',
    alcohol: '',
    category: BeerCategory.Pilsner,
    description: '',
  }

  const [form, setForm] = useState(initialFormState)

  const isFormValid = Object.values(form).every(value => value.trim() !== '')

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{paddingBottom: 32}}
        showsVerticalScrollIndicator={false}>
        <Box className="px-6 py-4">
          {/* Header */}
          <HStack className="items-center" space="md">
            <Pressable onPress={() => router.push('/(myBeers)')} className="bg-[#E67E22] p-2 rounded-full">
              <MaterialCommunityIcons name="arrow-left" size={24} color="black" />
            </Pressable>
            <Heading size="xl" className="text-[#E67E22]">
              New beer
            </Heading>
          </HStack>

          <VStack space="xl" className="mt-8">
            {/* Name */}
            <VStack space="xs">
              <Text className="text-gray-400 font-bold ml-1">NAME *</Text>
              <Input className="border-neutral-800 bg-neutral-900/50 h-14 rounded-2xl" isRequired>
                <InputField
                  className="text-white"
                  placeholder="Bijv. Westvleteren 12"
                  value={form.name}
                  onChangeText={val => setForm({...form, name: val})}
                />
              </Input>
            </VStack>
            {/* Brewery */}
            <HStack space="md">
              <VStack space="xs" className="flex-1">
                <Text className="text-gray-400 font-bold ml-1">BREWERY *</Text>
                <Input className="border-neutral-800 bg-neutral-900/50 h-14 rounded-2xl">
                  <InputField
                    className="text-white"
                    placeholder="Brouwerij..."
                    value={form.brewery}
                    onChangeText={val => setForm({...form, brewery: val})}
                  />
                </Input>
              </VStack>
              <VStack space="xs" className="w-1/3">
                <Text className="text-gray-400 font-bold ml-1">ALCOHOL % *</Text>
                <Input className="border-neutral-800 bg-neutral-900/50 h-14 rounded-2xl">
                  <InputField
                    className="text-white"
                    placeholder="8.5"
                    keyboardType="numeric"
                    value={form.alcohol}
                    onChangeText={val => setForm({...form, alcohol: val})}
                  />
                </Input>
              </VStack>
            </HStack>
            {/* Category */}
            <VStack space="xs">
              <Text className="text-gray-400 font-bold ml-1">CATEGORY *</Text>
              <Select
                selectedValue={form.category}
                onValueChange={value => setForm({...form, category: value as BeerCategory})}>
                <SelectTrigger className="border-neutral-800 bg-neutral-900/50 h-14 rounded-2xl px-4 flex-row justify-between items-center">
                  <Box pointerEvents="none" className="flex-1">
                    <SelectInput
                      placeholder="Kies een categorie..."
                      className="text-white"
                      value={form.category}
                      editable={false}
                    />
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
                      <SelectItem key={opt.value} label={opt.label} value={opt.value} className="py-3" />
                    ))}
                  </SelectContent>
                </SelectPortal>
              </Select>
            </VStack>

            {/* Description */}
            <FormControl>
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
              </VStack>
            </FormControl>
            {/* Save Button */}
            <Button
              size="lg"
              className="bg-[#E67E22] rounded-full h-14 mt-4"
              onPress={() =>
                addBeer(form, {
                  onSuccess: () => {
                    setForm(initialFormState)
                    router.push('/(myBeers)')
                  },
                })
              }
              isDisabled={isPending || !isFormValid}>
              {isPending && <ButtonSpinner color="black" className="mr-2" />}
              <ButtonText className="text-black font-extrabold text-lg">SAVE BEER</ButtonText>
            </Button>
          </VStack>
        </Box>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CreateBeerScreen
