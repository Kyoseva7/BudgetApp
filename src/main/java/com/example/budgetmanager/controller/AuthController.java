@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        String username = user.getUsername().trim(); // премахване на интервали
        System.out.println("Проверка за потребител: " + username);

        if (userRepository.findByUsername(username).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists");
        }

        user.setUsername(username); // обновяваме името без интервали
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Optional<User> optionalUser = userService.getUserByUsername(user.getUsername());
        if (optionalUser.isPresent() &&
                userService.validatePassword(user.getPassword(), optionalUser.get().getPassword())) {
            String token = jwtUtil.generateToken(user.getUsername());
            return ResponseEntity.ok(Collections.singletonMap("token", token));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
}
