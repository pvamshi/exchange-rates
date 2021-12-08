# exchange-rates

## Steps to run the application 

1. Clone the repository
2. Run `yarn` or `npm install` 
3. Run `yarn start` or `npm start` 
4. View app at `http://localhost:1234`

## Notable features 
- Both inputs can be edited to change from and to currencies 
- Network call only once to get the rate, thereafter manually calculated the conversion
- No buttons needed to click to view changes, dynamically two way binding enabled 

## Time spent 
- 2-3 hours on actual code
- 1 hour researching on API 
- 30 min figuring out where to get currency codes 
- 30 min setting up the project ( started with simple css, but later moved to chakra-ui)

## Enhancements 
- [ ] Error handling for network calls 
- [ ] Unit tests
  - Use [mswjs](https://mswjs.io/) to mock the network calls 
- [ ] Graph plotting daily changes 
- [ ] github pages 
- [ ] Better way to handle rounding of the values 
- [ ] Better way to handle API Key securely
- [ ] Improved UX
  - Show fetching of prices info to the user
  - Responsive design
  - Better select dropdown with better search
  
## Technical choices

### Parcel 
- Uses rust based compiler ( fast ) 
- Zero configuration
- Hot reloading and caching advantage

### Chakra UI
- Ready components available
- Utilities (similar to tailwindcss) included
- Good support for dark mode switching 

### MSW 
- Integration testing instead of mocking
- simple to setup
- can be used in development too 

  
