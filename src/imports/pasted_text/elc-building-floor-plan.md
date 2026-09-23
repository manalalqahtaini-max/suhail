Use the uploaded “ELC Building – Middle Floor” plan as the single source of truth.

For now, pause all branding and visual identity work.

Rebuild the floor/navigation section of the existing SUHAIL prototype as a clean, interactive 3D indoor navigation experience.

IMPORTANT:
Do not keep patching the current floor implementation if its structure is inaccurate.

Before rebuilding, remove the previous incorrect floor/navigation implementation instead of hiding it or layering the new version on top of it.

If the current model or navigation logic is flawed, rebuild this section cleanly from scratch.

Do not redesign or modify unrelated parts of the SUHAIL app.


GOAL

Convert the uploaded 2D floor plan into a simplified but accurate interactive 3D floor model that supports real indoor route navigation.

The result must function as a real navigation environment, not just visually look 3D.


FLOOR STRUCTURE

Recreate the actual layout shown in the uploaded reference as closely as possible.

Maintain:
- Correct room positions
- Approximate room proportions
- Correct corridor shapes
- Correct corridor connections
- Complete wall boundaries
- Real openings between circulation areas
- Correct stairs and lift locations
- Service spaces visible in the plan

Do not:
- Leave incomplete walls
- Create accidental wall gaps
- Merge separate rooms
- Invent shortcuts between spaces
- Change the overall building geometry
- Create fake openings just to make routing easier

Include the visible room labels from the plan, including:

L035
L036
L037
L038
L039
L040
L041
L042
L043
L044
L045
L046
L047
L048
L049
L050
L051
L052
L053
L054
L055
L056
L057
L058
L059
L060
L061
L062
L063
L064
L065
L066

Also include the clearly identified spaces shown in the reference:

- Classrooms
- Teachers’ Offices
- Teachers’ Lounge
- Toilets
- Tea Room
- Conference Room
- Labs
- Lift
- Stairs
- Storerooms
- Mechanical / Electrical / service spaces where visible


TRUE 3D IMPLEMENTATION

Do not fake the 3D experience using:
- A static image
- A perspective-transformed screenshot
- A decorative 3D mockup
- A pre-rendered floor image

Build the floor as actual interactive 3D geometry inside the prototype.

If needed, use an appropriate lightweight browser-based 3D implementation such as Three.js or equivalent.

The model should contain actual:

- Floor geometry
- Extruded walls
- Room boundaries
- Corridor spaces
- Openings / entrances
- Route geometry
- Camera movement

Keep the geometry lightweight and suitable for a prototype.

Do not spend time on:
- Furniture
- Detailed textures
- Realistic materials
- Decorative lighting
- Branding
- Unnecessary visual effects

Use simple, clean architectural materials.


WALLS AND ROOM ENTRANCES

Walls must act as real boundaries.

A room must only be reachable through its valid corridor-facing entrance.

Do not connect the navigation path directly to the center of a room through a wall.

Each destination must have a defined entrance point.

Navigation should work like this:

Current Position
→ Corridor
→ Corridor Intersection
→ Correct Corridor
→ Room Entrance
→ Destination

NOT:

Current Position
→ Straight Line Through Walls
→ Destination

Where an exact doorway is not clearly visible in the uploaded reference, use one logical corridor-facing entrance and keep it consistent.

Do not create multiple random entrances just to make routing easier.


WALKABLE NAVIGATION NETWORK

Build a proper walkable navigation graph based on the real corridors.

Create navigation nodes at:

- Corridor centerlines
- Corridor intersections
- Corridor turns
- Branch points
- Stair/lift access points
- Valid room entrances

Connect only nodes that have a real walkable path between them.

Each room should connect to the navigation network only through its designated entrance.

Route calculation must use the walkable network.

Do not calculate navigation using a direct straight line between the user and destination.


ROUTING RULES

The route must:

- Stay inside valid walkable corridors
- Follow corridor geometry
- Turn naturally at intersections
- Reach rooms through their valid entrances
- Never pass through walls
- Never cut through another room
- Never cross non-walkable building areas
- Never leave the floor boundary

If a route crosses a wall, do not visually hide the problem.

Fix the underlying:
- Geometry
- Navigation graph
- Room entrance
- Route logic


COLLISION BEHAVIOR

The moving user marker and camera must respect building geometry.

The user must never:

- Walk through a wall
- Clip through a wall
- Move across a room boundary incorrectly
- Jump between disconnected corridors

Walls must behave as solid navigation boundaries.


DEFAULT FLOOR VIEW

Before navigation starts, show the entire floor from a clear elevated isometric 3D perspective.

The user should immediately understand:
- Their current location
- The selected destination
- The overall route
- The surrounding rooms
- The corridor structure

Highlight:
- Current location using a clear user marker
- Selected destination using a distinct marker
- Calculated route through the actual corridors

Do not start in first-person view.

The initial view should feel like a clean 3D indoor map.


NAVIGATION VIEW

Once the user starts navigation, smoothly transition from the full-floor isometric view into a closer 3D navigation-follow view.

During navigation:

- Keep the camera slightly above and behind the current user position
- Follow the route smoothly
- Rotate the camera gradually as the route turns
- Keep the next section of the route visible
- Keep the user marker visible
- Keep the route visible
- Keep the destination understandable
- Avoid sudden camera jumps
- Avoid clipping the camera through walls

The experience should feel like moving through a real indoor building, not watching a line move across a flat map.


TURN-BY-TURN GUIDANCE

During navigation, provide clear turn-by-turn guidance.

Show a compact instruction panel containing:

- Direction arrow
- Current instruction
- Distance to the next turn
- Remaining distance to the destination
- Destination room name/number

Example instructions:

- Continue straight for 15 m
- Turn right at the next corridor
- Turn left after 8 m
- Continue straight
- Your destination is on the right
- Your destination is on the left
- You have arrived at L059

Update the instruction automatically as the user progresses along the route.

The route line and the turn-by-turn instructions must always match the same walkable navigation graph.

Do not generate instructions that contradict the visual route.


CAMERA AND WALL VISIBILITY

Do not allow walls to completely block the user’s view during navigation.

If necessary:
- Adjust the camera angle
- Move the camera slightly upward
- Temporarily fade or visually occlude obstructing walls

Do not remove or change the actual wall geometry just to improve visibility.

The building structure must remain correct.


INTERACTION

Keep the existing SUHAIL room-selection concept.

Expected flow:

1. User selects a destination room.
2. User presses the existing navigation/start action.
3. Open the interactive 3D floor.
4. Show the full floor from the elevated isometric view.
5. Highlight the current location.
6. Highlight the selected destination.
7. Calculate a valid route using the corridor navigation network.
8. Display the route.
9. User starts navigation.
10. Smoothly transition into the closer 3D navigation-follow view.
11. Show turn-by-turn guidance.
12. Camera follows the user smoothly through valid corridors.
13. Route turns correctly at corridor intersections.
14. Instructions update as the user moves.
15. User arrives at the correct room entrance.


CURRENT LOCATION

Use a defined valid starting position inside the walkable corridor network.

The starting point must be connected to the navigation graph.

Do not place the user inside:
- A wall
- A room
- An inaccessible area

If the user’s location is simulated, place it on a valid corridor node.


DESTINATION BEHAVIOR

When a destination is selected:

- Highlight the room clearly
- Highlight its actual entrance
- Route to the entrance rather than the center of the room
- Mark arrival when the user reaches the valid entrance point

Do not allow the route to cross the wall just to reach the room center.


TESTING

Before considering this complete, test several routes between locations on different sides of the floor.

For example, test routes between:

- Left side and right side
- Upper corridor and lower/side corridor
- A classroom and a teachers’ office
- Two rooms separated by several corridor turns
- A room near the stairs and a room near the opposite side

For every test verify:

- The route stays inside corridors
- The route does not cross walls
- The user does not clip through walls
- Corridor turns are followed correctly
- Room entrances are used correctly
- The destination entrance is reached correctly
- Turn-by-turn instructions match the real route
- The camera remains usable throughout navigation
- The first isometric overview remains clear before navigation starts


REBUILD RULE

Do not keep stacking fixes onto broken geometry.

If the existing implementation makes correct navigation difficult:

1. Remove the incorrect floor implementation.
2. Rebuild the floor geometry.
3. Define valid room entrances.
4. Rebuild the walkable navigation graph.
5. Rebuild the routing logic.
6. Rebuild the navigation camera behavior if needed.
7. Test multiple routes again.

Correct architecture and navigation behavior are more important than preserving broken previous work.


SCOPE

For this task, work only on:

- Rebuilding the ELC Middle Floor
- Interactive 3D floor geometry
- Walls and room boundaries
- Valid room entrances
- Walkable corridor network
- Route calculation
- Collision-safe navigation
- Full-floor isometric overview
- Navigation-follow camera
- Turn-by-turn guidance
- Arrival behavior
- Route testing

Do NOT:

- Redesign the SUHAIL app
- Change existing branding
- Change unrelated screens
- Add new visual identity work
- Add unnecessary features
- Add detailed furniture or decoration

Focus only on making this floor accurate, genuinely navigable, structurally correct, and easy to understand during both overview and active navigation.