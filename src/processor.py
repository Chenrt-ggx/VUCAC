import os
from . import utils


def process_read(name, directory):
    if not os.path.exists(directory):
        print(name + ' path \"' + directory + '\" does not exist')
        print('program terminated due to error')
        exit(0)
    result = []
    for i in os.listdir(directory):
        if utils.is_image(directory + '/' + i):
            result.append(i)
    if len(directory) == 0:
        print('no valid image found in ' + name + ' path \"' + directory + '\"')
        print('program terminated due to error')
        exit(0)
    result = sorted(result, key=lambda x: (len(x), x))
    width, height = utils.get_size(directory, result)
    if width == -1 or height == -1:
        print(name + ' size not all same')
        print('program terminated due to error')
        exit(0)
    print(str(len(result)) + ' ' + name + ' detected:', end='\n\n')
    for i in result:
        print(i, end=' ')
    print('\n')
    print('-----------------------------------------------', end='\n\n')
    return {
        'width': width,
        'height': height,
        'directory': directory,
        'names': result
    }


def process_merge(merge_masks, merge_backgrounds, directory_pattern, suffix):
    if merge_masks['width'] != merge_backgrounds['width'] or merge_masks['height'] != merge_backgrounds['height']:
        print('mask size and background size mismatch')
        print('program terminated due to error')
        exit(0)
    width, height = merge_masks['width'], merge_masks['height']
    print('all mask and background has size ' + str(width) + ' x ' + str(height), end='\n\n')
    print('-----------------------------------------------', end='\n\n')
    print(str(len(merge_masks['names'])) + ' new directory will be created:', end='\n\n')
    map_to_directory = {}
    for i in merge_masks['names']:
        directory = directory_pattern + '.'.join(i.split('.')[: -1]).strip()
        map_to_directory[i] = directory
        print(directory, end=' ')
    print('\n')
    print('-----------------------------------------------', end='\n\n')
    if len(set(map_to_directory.values())) != len(map_to_directory):
        print('folder name conflict detected')
        print('program terminated due to error')
        exit(0)
    utils.wait('merge')
    map_to_image = {}
    for i in merge_masks['names']:
        if not os.path.exists(map_to_directory[i]):
            os.mkdir(map_to_directory[i])
        dest = map_to_directory[i]
        print('merge for ' + i + ' to directory ' + dest + ' started')
        fix_mask = '.'.join(i.split('.')[: -1]).strip()
        for j in merge_backgrounds['names']:
            fix_background = '.'.join(j.split('.')[: -1]).strip()
            name = dest + '/' + fix_mask + '_' + fix_background + '.' + suffix
            map_to_image[i, j] = name
            utils.merge_image(merge_masks['directory'] + '/' + i, merge_backgrounds['directory'] + '/' + j, name)
        print('merge for ' + i + ' to directory ' + dest + ' finished', end='\n\n')
    print('-----------------------------------------------', end='\n\n')
    print('all ' + str(len(merge_masks['names'])) + '(mask) x ' + str(len(merge_backgrounds['names']))
          + '(background) images merged successfully', end='\n\n')
    return map_to_image


def process_splice(splice_masks, splice_backgrounds, name, map_to_image, file_info):
    op = input('splice selected images for ' + name + ' before exit ? (y / n) : ')
    if op.lower() != 'y':
        return
    print('please input selected image group id:')
    utils.print_splice_example()
    selected = input('input selected image group id : ').split()
    rows = input('input rows of spliced image : ')
    try:
        rows = int(rows)
        if rows < 1 or rows > len(splice_backgrounds['names']):
            raise ValueError
    except ValueError:
        print('invalid rows ' + rows)
        print('program terminated due to error')
        exit(0)
    print('\n-----------------------------------------------', end='\n\n')
    if len(selected) < 2 or len(selected) % rows != 0:
        print('invalid group count ' + str(len(selected)))
        print('program terminated due to error')
        exit(0)
    for i in range(len(selected)):
        try:
            value = int(selected[i])
            if value < 1 or value > len(splice_backgrounds['names']):
                raise ValueError
        except ValueError:
            print('invalid group id ' + str(selected[i]))
            print('program terminated due to error')
            exit(0)
    utils.wait('splice')
    if not os.path.exists(file_info['directory']):
        os.mkdir(file_info['directory'])
    for i in splice_masks['names']:
        images = []
        for j in selected:
            images.append(map_to_image[i, splice_backgrounds['names'][int(j) - 1]])
        print('splice for ' + i + ' started')
        prefix = file_info['directory'] + '/' + file_info['prefix']
        suffix = '.'.join(i.split('.')[: -1]).strip() + '.' + file_info['suffix']
        utils.join_image(images, rows, prefix + '_' + suffix)
        print('splice finished, \"' + prefix + '_' + suffix + '\" created successfully', end='\n\n')
    print('-----------------------------------------------', end='\n\n')
    print('program finished')
